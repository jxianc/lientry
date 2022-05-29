import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { JwtGqlAuthGuard } from '../auth/guards/jwt.guard'
import { EditLinksInput } from './dto/edit-links.input'
import { EditLinksResponse } from './dto/edit-links.response'
import { Link } from './entities/link.entity'
import { LinksService } from './links.service'

@Resolver()
export class LinksResolver {
  constructor(private readonly linksService: LinksService) {}

  @UseGuards(JwtGqlAuthGuard)
  @Mutation(() => EditLinksResponse)
  async EditLinks(
    @Args({ name: 'CURLinksInput' })
    { creates, updates, removes }: EditLinksInput,
    @Args({ name: 'treeId' }) treeId: string,
    @Context() ctx: any,
  ): Promise<EditLinksResponse> {
    let links: Link[] = []
    if (creates && creates.length > 0) {
      const response = await this.linksService.createManyLinks(
        creates,
        treeId,
        ctx.req.user.id,
      )
      if (!response.success && response.errMsg) {
        return {
          success: false,
          errMsg: response.errMsg,
        }
      }
      links = links.concat(response.links || [])
    }

    if (updates && updates.length > 0) {
      const response = await this.linksService.updateManyLinks(
        updates,
        treeId,
        ctx.req.user.id,
      )
      if (!response.success && response.errMsg) {
        return {
          success: false,
          errMsg: response.errMsg,
        }
      }
      links = links.concat(response.links || [])
    }

    if (removes && removes.length > 0) {
      const response = await this.linksService.removeManyLinks(
        removes,
        treeId,
        ctx.req.user.id,
      )
      if (!response.success && response.errMsg) {
        return {
          success: false,
          errMsg: response.errMsg,
        }
      }
    }

    return {
      success: true,
      links,
    }
  }
}
