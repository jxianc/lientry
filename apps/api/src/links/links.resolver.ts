import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { Link } from '@prisma/client'
import { TreeAuthorGuard } from 'src/trees/guards/tree-author.guard'
import { TreesService } from 'src/trees/trees.service'
import { JwtGqlAuthGuard } from '../auth/guards/jwt.guard'
import { EditLinksInput } from './dto/edit-links.input'
import { EditLinksResponse } from './dto/edit-links.response'
import { LinksService } from './links.service'

@Resolver()
export class LinksResolver {
  constructor(
    private readonly linksService: LinksService,
    private readonly treesService: TreesService,
  ) {}

  // NOTE this might need to be removed, it is not used anymore
  @UseGuards(JwtGqlAuthGuard, TreeAuthorGuard)
  @Mutation(() => EditLinksResponse)
  async EditLinks(
    @Args({ name: 'CURLinksInput' })
    { creates, updates, removes }: EditLinksInput,
    @Args({ name: 'treeId' }) treeId: string,
  ): Promise<EditLinksResponse> {
    // let links: Link[] = []
    if (creates && creates.length > 0) {
      const response = await this.linksService.createManyLinks(creates, treeId)
      if (!response.success && response.errMsg) {
        return {
          success: false,
          errMsg: response.errMsg,
        }
      }
      // links = links.concat(response.links || [])
    }

    if (updates && updates.length > 0) {
      const response = await this.linksService.updateManyLinks(updates)
      if (!response.success && response.errMsg) {
        return {
          success: false,
          errMsg: response.errMsg,
        }
      }
      // links = links.concat(response.links || [])
    }

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
}
