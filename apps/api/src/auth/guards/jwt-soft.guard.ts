import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { ExtractJwt } from 'passport-jwt'
import { TokenPayload } from '../../utils/token-payload.type'

// NOTE the purpose of this guard is just get jwt token from header
// and attach payload (userId) to request body
@Injectable()
export class JwtGqlSoftAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const extractJwtFromBearer = ExtractJwt.fromAuthHeaderAsBearerToken()
    const accessToken = extractJwtFromBearer(ctx.getContext().req)

    if (accessToken) {
      const { userId } = this.jwtService.verify<TokenPayload>(accessToken, {
        ignoreExpiration: false,
        secret: process.env.ACCESS_TOKEN_SECRET,
      })

      // attach userId into request
      ctx.getContext().req.userId = userId
    }

    return true
  }
}
