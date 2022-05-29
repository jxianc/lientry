import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { User } from '../../users/entities/user.entity'
import { TreesService } from '../trees.service'

// NOTE make sure the resolvers using this guard should provide `treeId` as argument
@Injectable()
export class TreeAuthorGuard implements CanActivate {
  constructor(private readonly treesService: TreesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // for graphql resolver
    const ctx = GqlExecutionContext.create(context)

    const user = ctx.getContext().req.user as User
    const { treeId } = ctx.getArgs()

    if (treeId) {
      const tree = await this.treesService.getTreeById(treeId)
      if (!tree) {
        // tree not found
        throw new NotFoundException()
      }
      if (tree && tree.userId === user.id) {
        // tree is authorzied
        return true
      }
    }

    throw new UnauthorizedException()
  }
}
