import { Injectable } from '@nestjs/common'
import { TreesService } from '../trees/trees.service'
import { PrismaService } from '../prisma.service'
import { CreateLinkInput } from './dto/create-link.input'
import { CreateLinkResponse } from './dto/create-link.response'

@Injectable()
export class LinksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly treesService: TreesService,
  ) {}

  async createLink(
    { title, description, url }: CreateLinkInput,
    treeId: string,
    userId: string,
  ): Promise<CreateLinkResponse> {
    const tree = await this.treesService.getTreeById(treeId)
    if (!tree) {
      return {
        success: false,
        errMsg: 'tree not found',
      }
    }
    if (userId !== tree.userId) {
      return {
        success: false,
        errMsg: 'unauthorized',
      }
    }

    try {
      const link = await this.prisma.link.create({
        data: {
          title,
          description: description || undefined,
          url,
          treeId,
        },
        include: {
          tree: {
            include: {
              user: true,
            },
          },
        },
      })
      return {
        success: true,
        link,
      }
    } catch (err) {
      console.log(err)
      return {
        success: false,
        errMsg: 'failed to create link',
      }
    }
  }
}
