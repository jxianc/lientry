import { Injectable, NotFoundException } from '@nestjs/common'
import { Tree } from '@prisma/client'
import { BaseResponse } from '../base/base.response'
import { PrismaService } from '../prisma.service'
import { CreateTreeInput } from './dto/create-tree.input'
import { CreateTreeResponse } from './dto/create-tree.response'
import { UpdateTreeInfoInput } from './dto/update-tree.input'
import { UpdateTreeResponse } from './dto/update-tree.response'

@Injectable()
export class TreesService {
  constructor(private readonly prisma: PrismaService) {}

  async createTree(
    { name, description, isPublic }: CreateTreeInput,
    userId: string,
  ): Promise<CreateTreeResponse> {
    try {
      const tree = await this.prisma.tree.create({
        data: {
          name,
          description,
          isPublic,
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

  async getTreeById(treeId: string, isInternal = false, userId?: string) {
    const tree = await this.prisma.tree.findUnique({
      where: {
        id: treeId,
      },
      include: {
        user: true,
        links: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        userSavedTrees: {
          where: {
            userId,
            treeId,
          },
          include: {
            user: true,
          },
        },
      },
    })
    if (!tree) {
      throw new NotFoundException('tree is not found')
    }

    if (tree && !isInternal) {
      // increment viewed count
      const updatedTree = await this.prisma.tree.update({
        where: {
          id: tree.id,
        },
        data: {
          viewed: tree.viewed + 1,
        },
        include: {
          user: true,
          links: {
            orderBy: {
              createdAt: 'asc',
            },
          },
        },
      })
      return updatedTree
    } else {
      return tree
    }
  }

  async getRecentTree(cursorId: string, userId?: string): Promise<Tree[]> {
    const trees = await this.prisma.tree.findMany({
      where: {
        OR: [
          {
            userId: userId || undefined,
          },
          {
            isPublic: true,
          },
        ],
      },
      include: {
        user: true,
        links: true,
        userSavedTrees: {
          where: {
            userId,
          },
          include: {
            user: true,
          },
        },
      },
      take: 10,
      skip: cursorId ? 1 : undefined,
      cursor: cursorId
        ? {
            id: cursorId,
          }
        : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    })
    return trees
  }

  async getTrendingTrees(cursorId: string, userId: string): Promise<Tree[]> {
    const trendingTrees = await this.prisma.tree.findMany({
      where: {
        OR: [
          {
            userId: userId || undefined,
          },
          {
            isPublic: true,
          },
        ],
      },
      include: {
        user: true,
        links: true,
        userSavedTrees: {
          where: {
            userId,
          },
          include: {
            user: true,
          },
        },
      },
      take: 10,
      skip: cursorId ? 1 : undefined,
      cursor: cursorId
        ? {
            id: cursorId,
          }
        : undefined,
      orderBy: [{ viewed: 'desc' }, { createdAt: 'desc' }],
    })
    return trendingTrees
  }

  async updateTree(
    { name, description, isPublic }: UpdateTreeInfoInput,
    treeId: string,
  ): Promise<UpdateTreeResponse> {
    const tree = await this.getTreeById(treeId, true)

    try {
      const updatedTree = await this.prisma.tree.update({
        where: {
          // guard in resolver checked this, so tree is guaranteed exists
          id: tree?.id,
        },
        data: {
          name: name || undefined,
          description: description || undefined,
          isPublic: typeof isPublic === 'boolean' ? isPublic : undefined,
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

  async removeTree(treeId: string): Promise<BaseResponse> {
    await this.prisma.tree.delete({
      where: {
        id: treeId,
      },
    })

    return {
      success: true,
    }
  }

  async saveTree(treeId: string, userId: string): Promise<BaseResponse> {
    const tree = await this.getTreeById(treeId, true, userId)

    if (!tree) {
      throw new NotFoundException('tree is not found')
    }

    try {
      await this.prisma.userSavedTree.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          tree: {
            connect: {
              id: treeId,
            },
          },
        },
      })

      return {
        success: true,
      }
    } catch (err) {
      console.log(err)
      return {
        success: false,
        errMsg: 'failed to save tree',
      }
    }
  }

  async unsaveTree(treeId: string, userId: string): Promise<BaseResponse> {
    const tree = await this.getTreeById(treeId, true, userId)

    if (!tree) {
      throw new NotFoundException('tree is not found')
    }

    try {
      await this.prisma.userSavedTree.delete({
        where: {
          userId_treeId: {
            userId,
            treeId,
          },
        },
      })

      return {
        success: true,
      }
    } catch (err) {
      console.log(err)
      return {
        success: false,
        errMsg: 'failed to unsave tree',
      }
    }
  }
}
