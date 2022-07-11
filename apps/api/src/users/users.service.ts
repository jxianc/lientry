import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateUserInput } from './dto/create-user.input'
import { CreateUserResponse } from './dto/create-user.response'
import { hash } from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser({
    name,
    email,
    password,
  }: CreateUserInput): Promise<CreateUserResponse> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    // user with this email exists
    if (!!user) {
      return {
        success: false,
        errMsg: 'email has already been used',
      }
    }

    // hash password
    let hashedPassword = ''
    if (password) {
      const saltOrRounds = 7
      hashedPassword = await hash(password, saltOrRounds)
    }

    // create might throw error, so using try catch here
    try {
      const newUser = await this.prisma.user.create({
        data: {
          name: name || null,
          email,
          password: hashedPassword || null,
        },
      })
      return {
        success: true,
        user: newUser,
      }
    } catch (err) {
      console.log(err)
      return {
        success: false,
        errMsg: 'failed to create user',
      }
    }
  }

  async getUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async getUserById(
    id: string,
    { includeTree, isAuthor }: { includeTree?: boolean; isAuthor?: boolean },
  ) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: includeTree
        ? {
            provider: {
              include: {
                user: true,
              },
            },
            trees: {
              where: {
                isPublic:
                  typeof isAuthor === 'boolean' && isAuthor ? undefined : true,
              },
              orderBy: {
                createdAt: 'asc',
              },
              include: {
                user: true,
                links: {
                  orderBy: {
                    createdAt: 'asc',
                  },
                },
              },
            },
          }
        : undefined,
    })
  }
}
