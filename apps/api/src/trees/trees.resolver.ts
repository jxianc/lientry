import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { JwtGqlAuthGuard } from '../auth/guards/jwt.guard'
import { CreateTreeInput } from './dto/create-tree.input'
import { CreateTreeResponse } from './dto/create-tree.response'
import { Tree } from './entities/tree.entity'
import { TreesService } from './trees.service'

@Resolver(() => Tree)
export class TreesResolver {
  constructor(private readonly treesService: TreesService) {}

  @UseGuards(JwtGqlAuthGuard)
  @Mutation(() => CreateTreeResponse)
  async createTree(
    @Args({ name: 'createTreeInput' }) createTreeInput: CreateTreeInput,
    @Context() ctx: any,
  ): Promise<CreateTreeResponse> {
    return await this.treesService.createTree(createTreeInput, ctx.req.user.id)
  }

  @Query(() => Tree)
  async getTreeById(@Args({ name: 'treeId' }) treeId: string) {
    return await this.treesService.getTreeById(treeId)
  }

  // TODO get recent trees
  // TODO get trees by viewed ranking
}
