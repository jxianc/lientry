import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { ExtractJwt } from 'passport-jwt'
import { UsersService } from '../../users/users.service'
import { TokenPayload } from '../../utils/token-payload.type'
import { TreesService } from '../trees.service'

// NOTE make sure the resolvers using this guard should provide `treeId` as argument
@Injectable()
export class ReadTreeAuthorGuard implements CanActivate {
  constructor(
    private readonly treesService: TreesService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context)
    const { treeId } = ctx.getArgs()

    if (treeId) {
      const tree = await this.treesService.getTreeById(treeId, true)
      if (!tree) {
        // tree not found
        throw new NotFoundException('tree is not found')
      }

      if (tree.isPublic) {
        // tree is public, no need to verify current user
        return true
      }

      // tree is private, check current user's authorization
      const extractJwtFromBearer = ExtractJwt.fromAuthHeaderAsBearerToken()
      const accessToken = extractJwtFromBearer(ctx.getContext().req)

      if (accessToken) {
        const { userId } = this.jwtService.verify<TokenPayload>(accessToken, {
          ignoreExpiration: false,
          secret: process.env.ACCESS_TOKEN_SECRET,
        })

        const user = await this.usersService.getUserById(userId, {
          includeTree: false,
        })
        if (user && user.id === tree.userId) {
          return true
        } else {
          throw new UnauthorizedException(
            'This tree is private, your are not authorized to access this tree',
          )
        }
      } else {
        throw new UnauthorizedException()
      }
    }

    throw new UnauthorizedException()
  }
}
