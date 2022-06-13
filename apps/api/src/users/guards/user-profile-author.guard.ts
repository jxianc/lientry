import { ExecutionContext, Injectable, NotFoundException } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { ExtractJwt } from 'passport-jwt'
import { TokenPayload } from '../../utils/token-payload.type'
import { UsersService } from '../users.service'

// NOTE make sure the resolvers using this guard should provide `userId` as argument
@Injectable()
export class UserProfileAuthor extends AuthGuard('jwt') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)

    const { userId: userIdFromArgs } = ctx.getArgs()

    const extractJwtFromBearer = ExtractJwt.fromAuthHeaderAsBearerToken()
    const accessToken = extractJwtFromBearer(ctx.getContext().req)

    if (accessToken) {
      const { userId: userIdFromToken } = this.jwtService.verify<TokenPayload>(
        accessToken,
        {
          ignoreExpiration: false,
          secret: process.env.ACCESS_TOKEN_SECRET,
        },
      )

      const user = await this.usersService.getUserById(userIdFromArgs, {
        includeTree: true,
        isAuthor: userIdFromToken === userIdFromArgs,
      })

      if (!user) {
        throw new NotFoundException('user not found')
      }

      // attach user into request
      ctx.getContext().req.user = user

      return true
    }

    // no accesstoken so just fetch user profile with only public trees
    const user = await this.usersService.getUserById(userIdFromArgs, {
      isAuthor: false,
    })
    ctx.getContext().req.user = user
    return true
  }
}
