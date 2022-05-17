import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateUserInput } from './dto/create-user.input'
import { CreateUserResponse } from './dto/create-user.response'
import { hash } from 'bcrypt'
import { User } from './entities/user.entity'

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

    // hashing password
    let hashedPassword = ''
    if (password) {
      const saltOrRounds = 7
      hashedPassword = await hash(password, saltOrRounds)
    }

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

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`
  // }
}
