import { Injectable } from '@nestjs/common'
import { BaseResponse } from '../base/base.response'
import { PrismaService } from '../prisma.service'
import { CreateTreeInput } from './dto/create-tree.input'
import { CreateTreeResponse } from './dto/create-tree.response'
import { UpdateTreeInput } from './dto/update-tree.input'
import { UpdateTreeResponse } from './dto/update-tree.response'
import { Tree } from './entities/tree.entity'

@Injectable()
export class TreesService {
  constructor(private readonly prisma: PrismaService) {}

  async createTree(
    { name, description }: CreateTreeInput,
    userId: string,
  ): Promise<CreateTreeResponse> {
    try {
      const tree = await this.prisma.tree.create({
        data: {
          name,
          description: description || undefined,
          userId,
        },
        include: {
          user: true,
        },
      })
      return {
        success: true,
        tree,
      }
    } catch (err) {
      console.log(err)
      return {
        success: false,
        errMsg: 'failed to create tree',
      }
    }
  }

  async getTreeById(treeId: string) {
    return await this.prisma.tree.findUnique({
      where: {
        id: treeId,
      },
      include: {
        user: true,
        links: true,
      },
    })
  }

  async updateTree(
    { treeId, name, description }: UpdateTreeInput,
    userId: string,
  ): Promise<UpdateTreeResponse> {
    const tree = await this.getTreeById(treeId)
    if (!tree) {
      return {
        success: false,
        errMsg: 'tree not found',
      }
    }

    if (tree.user.id !== userId) {
      return {
        success: false,
        errMsg: 'unauthorized',
      }
    }

    try {
      const updatedTree = await this.prisma.tree.update({
        where: {
          id: tree.id,
        },
        data: {
          name: name ? name : undefined,
          description: description ? description : undefined,
        },
        include: {
          user: true,
        },
      })
      return {
        success: true,
        tree: updatedTree,
      }
    } catch (err) {
      console.log(err)
      return {
        success: false,
        errMsg: 'failed to update tree',
      }
    }
  }

  async removeTree(treeId: string, userId: string): Promise<BaseResponse> {
    const tree = await this.getTreeById(treeId)
    if (!tree) {
      return {
        success: false,
        errMsg: 'tree not found',
      }
    }

    if (tree.user.id !== userId) {
      return {
        success: false,
        errMsg: 'unauthorized',
      }
    }

    await this.prisma.tree.delete({
      where: {
        id: treeId,
      },
    })

    return {
      success: true,
    }
  }
}
