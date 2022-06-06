import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { TreesService } from '../trees.service'

// NOTE make sure the resolvers using this guard should provide `treeId` as argument
@Injectable()
export class TreeAuthorGuard implements CanActivate {
  constructor(private readonly treesService: TreesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // for graphql resolver
    const ctx = GqlExecutionContext.create(context)

    // get user from context
    const user = ctx.getContext().req.user as User

    // get treeId from arguments and find the tree
    const { treeId } = ctx.getArgs()
    if (treeId) {
      const tree = await this.treesService.getTreeById(treeId, true)
      if (!tree) {
        // tree not found
        throw new NotFoundException('tree is not found')
      }

      // TODO maybe there is another way to do this
      // get tree by id
      if (ctx.getInfo().fieldName === 'getTreeById' && tree.isPublic) {
        return true
      } else if (tree && tree.userId === user.id) {
        // tree is authorzied
        return true
      }
    }

    throw new UnauthorizedException(
      'your are not authorized to access this tree',
    )
  }
}
