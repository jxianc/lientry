import { Injectable } from '@nestjs/common'
import { Link } from '@prisma/client'
import { BaseResponse } from '../base/base.response'
import { PrismaService } from '../prisma.service'
import {
  CreateLinkInput,
  RemoveLinkInput,
  UpdateLinkInput,
} from './dto/edit-links.input'
import {
  CreateLinkResponse,
  CreateManyLinksResponse,
  UpdateLinkResponse,
  UpdateManyLinksResponse,
} from './dto/edit-links.response'

@Injectable()
export class LinksService {
  constructor(private readonly prisma: PrismaService) {}

  async createManyLinks(
    createLinksInput: CreateLinkInput[],
    treeId: string,
  ): Promise<CreateManyLinksResponse> {
    const newLinks: Link[] = []
    for (const input of createLinksInput) {
      const response = await this.createLink(input, treeId)
      if (!response.success || !response.link) {
        // failed to create link
        return {
          success: false,
          errMsg: response.errMsg,
        }
      }
      newLinks.push(response.link)
    }
    return {
      success: true,
      links: newLinks,
    }
  }

  async updateManyLinks(
    updateLinksInput: UpdateLinkInput[],
  ): Promise<UpdateManyLinksResponse> {
    const newLinks: Link[] = []
    for (const input of updateLinksInput) {
      const response = await this.updateLink(input)
      if (!response.success || !response.link) {
        // failed to update link
        return {
          success: false,
          errMsg: response.errMsg,
        }
      }
      newLinks.push(response.link)
    }
    return {
      success: true,
      links: newLinks,
    }
  }

  async removeManyLinks(
    removeLinkInput: RemoveLinkInput[],
  ): Promise<BaseResponse> {
    let removeSuccessCount = 0
    for (const input of removeLinkInput) {
      const response = await this.removeLink(input)
      if (!response.success) {
        // failed to remove link
        return {
          success: false,
          errMsg: response.errMsg,
        }
      }
      removeSuccessCount++
    }
    if (removeSuccessCount !== removeLinkInput.length) {
      return {
        success: false,
        errMsg: 'failed to remove link',
      }
    }
    return {
      success: true,
    }
  }

  async createLink(
    { title, description, url }: CreateLinkInput,
    treeId: string,
  ): Promise<CreateLinkResponse> {
    try {
      const link = await this.prisma.link.create({
        data: {
          title,
          description,
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

  async updateLink({
    linkId,
    title,
    description,
    url,
  }: UpdateLinkInput): Promise<UpdateLinkResponse> {
    try {
      const updatedLink = await this.prisma.link.update({
        where: {
          id: linkId,
        },
        data: {
          title,
          description,
          url,
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
        link: updatedLink,
      }
    } catch (err) {
      console.log(err)
      return {
        errMsg: 'failed to update link',
        success: false,
      }
    }
  }

  async removeLink({ linkId }: RemoveLinkInput): Promise<BaseResponse> {
    try {
      await this.prisma.link.delete({
        where: {
          id: linkId,
        },
      })
      return {
        success: true,
      }
    } catch (err) {
      console.log(err)
      return {
        success: false,
        errMsg: 'failed to remove link',
      }
    }
  }
}
