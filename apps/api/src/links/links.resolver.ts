import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { JwtAuthGuard } from '../auth/guards/jwt.guard'
import { CreateLinkInput } from './dto/create-link.input'
import { CreateLinkResponse } from './dto/create-link.response'
import { LinksService } from './links.service'

@Resolver()
export class LinksResolver {
  constructor(private readonly linksService: LinksService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CreateLinkResponse)
  async createLink(
    @Args({ name: 'createLinkInput' }) createLinkInput: CreateLinkInput,
    @Args({ name: 'treeId' }) treeId: string,
    @Context() ctx: any,
  ): Promise<CreateLinkResponse> {
    return await this.linksService.createLink(
      createLinkInput,
      treeId,
      ctx.req.user.id,
    )
  }

  // get link by id
  // get links by treeid
}
