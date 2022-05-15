import { UseGuards } from '@nestjs/common'
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'
import { AuthResponse } from './dto/auth.response'
import { LoginUserInput } from './dto/login-user.input'
import { RegisterUserInput } from './dto/register-user.input'
import { LocalGqlAuthGuard } from './guards/local-gql.guard'

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => AuthResponse)
  async register(
    @Args({ name: 'registerUserInput' }) registerUserInput: RegisterUserInput,
    @Context() ctx: any,
  ): Promise<AuthResponse> {
    const { success, user, errMsg } = await this.usersService.createUser(
      registerUserInput,
    )
    if (success && user) {
      const accessToken = await this.authService.login(user, ctx.res)
      return {
        success,
        user,
        accessToken,
      }
    } else {
      return {
        success,
        errMsg,
      }
    }
  }

  @UseGuards(LocalGqlAuthGuard)
  @Mutation(() => AuthResponse)
  async login(
    @Args({ name: 'loginUserInput' }) _loginUserInput: LoginUserInput,
    @Context() ctx: any,
  ): Promise<AuthResponse> {
    const accessToken = await this.authService.login(ctx.user as User, ctx.res)
    return {
      success: true,
      user: ctx.user,
      accessToken,
    }
  }
}