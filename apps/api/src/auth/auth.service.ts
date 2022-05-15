import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcrypt'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { Request, Response } from 'express'
import { JwtService } from '@nestjs/jwt'
import { TokenPayload } from '../utils/token-payload.type'
import { PrismaService } from '../prisma.service'
import { AuthResponse } from './dto/auth.response'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

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
      email: user.email,
    })

    this.updateRefreshToken(refreshToken, user.id)
    this.sendRefreshToken(refreshToken, res)

    return accessToken
  }

  async refreshToken(req: Request, res: Response): Promise<AuthResponse> {
    // get refreshtoken from cookie
    // verify refreshtoken
    // generate new accesstoken and refreshtoken
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
      email: user.email,
      userId: user.id,
    })

    this.updateRefreshToken(newRefreshToken, tokenPayload.userId)
    this.sendRefreshToken(newRefreshToken, res)

    return {
      success: true,
      accessToken,
      user,
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

  async updateRefreshToken(refreshToken: string, userId: string) {
    const hashedRefreshToken = await hash(refreshToken, 11)
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hashedRefreshToken,
      },
    })
  }

  sendRefreshToken(refreshToken: string, res: Response) {
    res.cookie(process.env.REFRESH_TOKEN_COOKIE_KEY, refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: true,
    })
  }
}
