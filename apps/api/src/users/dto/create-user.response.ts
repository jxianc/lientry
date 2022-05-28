import { Field, ObjectType } from '@nestjs/graphql'
import { BaseResponse } from '../../base/base.response'
import { User } from '../entities/user.entity'

@ObjectType()
export class CreateUserResponse extends BaseResponse {
  @Field(() => User, { nullable: true })
  user?: User | null

  @Field()
  success!: boolean

  @Field({ nullable: true })
  errMsg?: string
}
