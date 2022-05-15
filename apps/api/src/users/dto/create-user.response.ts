import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '../entities/user.entity'

@ObjectType()
export class CreateUserResponse {
  @Field({ nullable: true })
  user?: User

  @Field()
  success!: boolean

  @Field({ nullable: true })
  errMsg?: string
}
