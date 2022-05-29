import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class BaseResponse {
  @Field(() => String, { nullable: true })
  errMsg?: string | null

  @Field()
  success!: boolean
}
