import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { JwtGqlAuthGuard } from '../auth/guards/jwt.guard'
import { BaseResponse } from '../base/base.response'
import { User } from '../users/entities/user.entity'
import { CreateTreeInput } from './dto/create-tree.input'
import { CreateTreeResponse } from './dto/create-tree.response'
import { UpdateTreeInput } from './dto/update-tree.input'
import { UpdateTreeResponse } from './dto/update-tree.response'
import { Tree } from './entities/tree.entity'
import { TreeAuthorGuard } from './guards/tree-author.guard'
import { TreesService } from './trees.service'

@Resolver(() => Tree)
export class TreesResolver {
  constructor(private readonly treesService: TreesService) {}

  @UseGuards(JwtGqlAuthGuard)
  @Mutation(() => CreateTreeResponse)
  async createTree(
    @Args({ name: 'createTreeInput' }) createTreeInput: CreateTreeInput,
    @CurrentUser() user: User,
  ): Promise<CreateTreeResponse> {
    return await this.treesService.createTree(createTreeInput, user.id)
  }

  @Query(() => Tree)
  async getTreeById(@Args({ name: 'treeId' }) treeId: string) {
    return await this.treesService.getTreeById(treeId)
  }

  @UseGuards(JwtGqlAuthGuard, TreeAuthorGuard)
  @Mutation(() => UpdateTreeResponse)
  async updateTree(
    @Args({ name: 'updateTreeInput' }) updateTreeInput: UpdateTreeInput,
    @Args({ name: 'treeId' }) treeId: string,
  ) {
    return await this.treesService.updateTree(updateTreeInput, treeId)
  }

  @UseGuards(JwtGqlAuthGuard, TreeAuthorGuard)
  @Mutation(() => BaseResponse)
  async removeTree(@Args({ name: 'treeId' }) treeId: string) {
    return await this.treesService.removeTree(treeId)
  }

  @Query(() => [Tree])
  async getRecentTrees(
    @Args({ name: 'cursorId', nullable: true, type: () => String })
    cursorId: string,
  ) {
    return await this.treesService.getRecentTree(cursorId)
  }

  @Query(() => [Tree])
  async getTrendingTrees(
    @Args({ name: 'cursorId', nullable: true, type: () => String })
    cursorId: string,
  ) {
    return await this.treesService.getTrendingTrees(cursorId)
  }
}
