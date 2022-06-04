import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcrypt'
import { UsersService } from '../users/users.service'
import { Request, Response } from 'express'
import { JwtService } from '@nestjs/jwt'
import { TokenPayload } from '../utils/token-payload.type'
import { PrismaService } from '../prisma.service'
import { AuthResponse } from './dto/auth.response'
import { OAuthUser } from './dto/oauth.user'
import { User } from '../users/entities/user.entity'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  // only use in local auth
  async validate(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.getUserByEmail(email)
    if (!user) {
      return null
    }

    // since this function only called for local login,
    // the password should exists
    const passwordIsValid = await compare(password, user.password as string)
    return passwordIsValid ? user : null
  }

  async login(user: User, res: Response) {
    // generate access and refresh token
    // hashed and update refreshtoken to db
    // send refreshtoken back as a cookie
    // return accesstoken

    const { accessToken, refreshToken } = this.generateToken({
      userId: user.id,
    })

    this.updateRefreshToken(refreshToken, user.id, true)
    this.sendRefreshToken(refreshToken, res)

    return accessToken
  }

  async oauthLogin(
    { id, provider: providerName, displayName, photos, emails }: OAuthUser,
    res: Response,
  ): Promise<AuthResponse> {
    // find user by provider id
    // if user exists, update user info then login
    // if user not exists,
    //    check user email, if used, throw error
    //    if not, create user and then login
    const provider = await this.prisma.provider.findUnique({
      where: {
        providerId_providerName: {
          providerId: id,
          providerName,
        },
      },
      include: {
        user: true,
      },
    })

    if (provider) {
      const updatedUser = await this.prisma.user.update({
        where: {
          id: provider.userId,
        },
        data: {
          name: displayName,
          image: photos
            ? photos.length
              ? photos[0].value
              : undefined
            : undefined,
        },
      })
      const accessToken = await this.login(updatedUser, res)
      return {
        success: true,
        accessToken,
      }
    } else {
      if (emails) {
        for (const email of emails) {
          const user = await this.prisma.user.findUnique({
            where: {
              email: email.value,
            },
          })
          if (user) {
            return {
              success: false,
              errMsg: 'email is already been used',
            }
          }
        }
      }

      // no email provided or email is not used
      try {
        const newUser = await this.prisma.user.create({
          data: {
            name: displayName,
            image: photos
              ? photos.length
                ? photos[0].value
                : undefined
              : undefined,
            email: emails
              ? emails.length
                ? emails[0].value
                : undefined
              : undefined,
            provider: {
              create: {
                providerId: id,
                providerName,
              },
            },
          },
        })
        const accessToken = await this.login(newUser, res)
        return {
          success: true,
          accessToken,
        }
      } catch (err) {
        console.log(err)
        return {
          success: false,
          errMsg: 'failed to create user',
        }
      }
    }
  }

  async logout(userId: string, res: Response): Promise<boolean> {
    // clear cookie and remove refreshtoken
    res.clearCookie(process.env.REFRESH_TOKEN_COOKIE_KEY, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
    await this.updateRefreshToken('', userId, false)
    return true
  }

  async refreshToken(req: Request, res: Response): Promise<AuthResponse> {
    // get refreshtoken from cookie
    // verify refreshtoken
    // generate new pair of accesstoken and refreshtoken
    // update new refreshtoken to db
    // return acesstoken and send refreshtoken as cookie
    const refreshToken = req.cookies[process.env.REFRESH_TOKEN_COOKIE_KEY]
    if (!refreshToken) {
      return {
        success: false,
        errMsg: 'unauthorized',
      }
    }

    let tokenPayload: TokenPayload
    try {
      tokenPayload = this.jwtService.verify<TokenPayload>(refreshToken, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      })
    } catch (err) {
      console.log(err)
      return {
        success: false,
        errMsg: 'unauthorized',
      }
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: tokenPayload.userId,
      },
    })
    // if refreshtoken not in db, we should ask user to login again
    if (!user || !user.refreshToken) {
      return {
        success: false,
        errMsg: 'unauthorized',
      }
    }

    const tokenIsValid = await compare(refreshToken, user.refreshToken)
    if (!tokenIsValid) {
      return {
        success: false,
        errMsg: 'unauthorized',
      }
    }

    const { accessToken, refreshToken: newRefreshToken } = this.generateToken({
      userId: user.id,
    })

    this.updateRefreshToken(newRefreshToken, tokenPayload.userId, true)
    this.sendRefreshToken(newRefreshToken, res)

    return {
      success: true,
      accessToken,
    }
  }

  generateToken(tokenPayload: TokenPayload) {
    const accessToken = this.jwtService.sign(tokenPayload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '15m',
    })
    const refreshToken = this.jwtService.sign(tokenPayload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: '7d',
    })
    return {
      accessToken,
      refreshToken,
    }
  }

  // update refreshtoken in db
  async updateRefreshToken(
    refreshToken: string,
    userId: string,
    requireHash: boolean,
  ) {
    let hashedRefreshToken = refreshToken
    if (requireHash) {
      hashedRefreshToken = await hash(refreshToken, 11)
    }
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hashedRefreshToken,
      },
    })
  }

  // send refreshtoken cookie
  sendRefreshToken(refreshToken: string, res: Response) {
    res.cookie(process.env.REFRESH_TOKEN_COOKIE_KEY, refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: true,
    })
  }
}
