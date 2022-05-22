import { Field, ObjectType } from '@nestjs/graphql'
import { BaseResponse } from '../../base/base.response'
import { Link } from '../entities/link.entity'

@ObjectType()
export class CreateLinkResponse extends BaseResponse {
  @Field(() => Link, { nullable: true })
  link?: Link | null
}
