import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { JwtGqlAuthGuard } from '../auth/guards/jwt.guard'
import { BaseResponse } from '../base/base.response'
import { CreateTreeInput } from './dto/create-tree.input'
import { CreateTreeResponse } from './dto/create-tree.response'
import { UpdateTreeInput } from './dto/update-tree.input'
import { UpdateTreeResponse } from './dto/update-tree.response'
import { TreeEntity } from './entities/tree.entity'
import { ReadTreeAuthorGuard } from './guards/read-tree-author.guard'
import { TreeAuthorGuard } from './guards/tree-author.guard'
import { TreesService } from './trees.service'

@Resolver(() => TreeEntity)
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

  @UseGuards(ReadTreeAuthorGuard)
  @Query(() => TreeEntity)
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

  @Query(() => [TreeEntity])
  async getRecentTrees(
    @Args({ name: 'cursorId', nullable: true, type: () => String })
    cursorId: string,
  ) {
    return await this.treesService.getRecentTree(cursorId)
  }

  @Query(() => [TreeEntity])
  async getTrendingTrees(
    @Args({ name: 'cursorId', nullable: true, type: () => String })
    cursorId: string,
  ) {
    return await this.treesService.getTrendingTrees(cursorId)
  }
}
