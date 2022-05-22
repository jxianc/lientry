import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class BaseResponse {
  @Field()
  errMsg?: string

  @Field()
  success!: boolean
}
