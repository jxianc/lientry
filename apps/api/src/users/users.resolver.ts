import { UseGuards } from '@nestjs/common'
import { Args, Context, Query, Resolver } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { UserEntity } from './entities/user.entity'
import { UserProfileAuthor } from './guards/user-profile-author.guard'
import { UsersService } from './users.service'

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(UserProfileAuthor)
  @Query(() => UserEntity, { nullable: true })
  getUserById(@Args({ name: 'userId' }) _userId: string, @Context() ctx: any) {
    return ctx.req.user as User
  }
}
