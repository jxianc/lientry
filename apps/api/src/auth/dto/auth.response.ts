import { Field, ObjectType } from '@nestjs/graphql'
import { CreateUserResponse } from '../../users/dto/create-user.response'

@ObjectType()
export class AuthResponse extends CreateUserResponse {
  @Field(() => String, { nullable: true })
  accessToken?: string | null
}
