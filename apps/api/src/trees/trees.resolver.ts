import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql'
import { TreesService } from './trees.service'
import { Tree } from './entities/tree.entity'
import { CreateTreeInput } from './dto/create-tree.input'
import { CreateTreeResponse } from './dto/create-tree.response'
import { UseGuards } from '@nestjs/common'
import { JwtGqlAuthGuard } from '../auth/guards/jwt.guard'

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
}
