import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { JwtGqlSoftAuthGuard } from '../auth/guards/jwt-soft.guard'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { JwtGqlAuthGuard } from '../auth/guards/jwt.guard'
import { BaseResponse } from '../base/base.response'
import { CreateTreeInput } from './dto/create-tree.input'
import { CreateTreeResponse } from './dto/create-tree.response'
import { UpdateTreeInfoInput } from './dto/update-tree.input'
import { UpdateTreeResponse } from './dto/update-tree.response'
import { TreeEntity } from './entities/tree.entity'
import { ReadTreeAuthorGuard } from './guards/read-tree-author.guard'
import { TreeAuthorGuard } from './guards/tree-author.guard'
import { TreesService } from './trees.service'
import { EditLinksInput } from '../links/dto/edit-links.input'
import { LinksService } from '../links/links.service'

@Resolver(() => TreeEntity)
export class TreesResolver {
  constructor(
    private readonly treesService: TreesService,
    private readonly linksService: LinksService,
  ) {}

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
    @Args({ name: 'updateTreeInfoInput' })
    updateTreeInfoInput: UpdateTreeInfoInput,
    @Args({ name: 'CURLinksInput' })
    { creates, updates, removes }: EditLinksInput,
    @Args({ name: 'treeId' }) treeId: string,
  ) {
    // update tree info
    const res = await this.treesService.updateTree(updateTreeInfoInput, treeId)

    // create links
    if (creates && creates.length > 0) {
      const response = await this.linksService.createManyLinks(creates, treeId)
      if (!response.success && response.errMsg) {
        return {
          success: false,
          errMsg: response.errMsg,
        }
      }
    }

    // update links
    if (updates && updates.length > 0) {
      const response = await this.linksService.updateManyLinks(updates)
      if (!response.success && response.errMsg) {
        return {
          success: false,
          errMsg: response.errMsg,
        }
      }
    }

    // remove links
    if (removes && removes.length > 0) {
      const response = await this.linksService.removeManyLinks(removes)
      if (!response.success && response.errMsg) {
        return {
          success: false,
          errMsg: response.errMsg,
        }
      }
    }

    // all CUD operations are successful
    const updatedTree = await this.treesService.getTreeById(treeId)

    return {
      success: true,
      tree: updatedTree,
    }
  }

  @UseGuards(JwtGqlAuthGuard, TreeAuthorGuard)
  @Mutation(() => BaseResponse)
  async removeTree(@Args({ name: 'treeId' }) treeId: string) {
    return await this.treesService.removeTree(treeId)
  }

  @UseGuards(JwtGqlSoftAuthGuard)
  @Query(() => [TreeEntity])
  async getRecentTrees(
    @Args({ name: 'cursorId', nullable: true, type: () => String })
    cursorId: string,
    @Context() ctx: any,
  ) {
    return await this.treesService.getRecentTree(cursorId, ctx.req.userId)
  }

  @UseGuards(JwtGqlSoftAuthGuard)
  @Query(() => [TreeEntity])
  async getTrendingTrees(
    @Args({ name: 'cursorId', nullable: true, type: () => String })
    cursorId: string,
    @Context() ctx: any,
  ) {
    return await this.treesService.getTrendingTrees(cursorId, ctx.req.userId)
  }
}
