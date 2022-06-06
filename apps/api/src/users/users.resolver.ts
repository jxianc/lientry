import { Args, Query, Resolver } from '@nestjs/graphql'
import { UserEntity } from './entities/user.entity'
import { UsersService } from './users.service'

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @Query(() => UserEntity)
  // getUserById(
  //   @Args()
  // ) {

  // }
}
