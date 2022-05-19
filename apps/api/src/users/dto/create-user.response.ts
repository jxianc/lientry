import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '../entities/user.entity'

@ObjectType()
export class CreateUserResponse {
  @Field(() => User, { nullable: true })
  user?: User | null

  @Field()
  success!: boolean

  @Field({ nullable: true })
  errMsg?: string
}
