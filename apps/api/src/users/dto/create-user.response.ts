import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { BaseResponse } from '../../base/base.response'
import { UserEntity } from '../entities/user.entity'

@ObjectType()
export class CreateUserResponse extends BaseResponse {
  @Field(() => UserEntity, { nullable: true })
  user?: User

  @Field()
  success!: boolean

  @Field({ nullable: true })
  errMsg?: string
}
