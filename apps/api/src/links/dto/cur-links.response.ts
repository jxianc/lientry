import { Field, ObjectType } from '@nestjs/graphql'
import { BaseResponse } from '../../base/base.response'
import { Link } from '../entities/link.entity'

@ObjectType()
export class CreateLinkResponse extends BaseResponse {
  @Field(() => Link, { nullable: true })
  link?: Link | null
}

@ObjectType()
export class UpdateLinkResponse extends CreateLinkResponse {}

@ObjectType()
export class EditLinksResponse extends BaseResponse {
  @Field(() => [Link], { nullable: true })
  links?: Link[] | null
}

@ObjectType()
export class CreateManyLinksResponse extends EditLinksResponse {}

@ObjectType()
export class UpdateManyLinksResponse extends EditLinksResponse {}
