import { Field, ObjectType } from '@nestjs/graphql'
import { Link } from '@prisma/client'
import { BaseResponse } from '../../base/base.response'
import { LinkEntity } from '../entities/link.entity'

@ObjectType()
export class CreateLinkResponse extends BaseResponse {
  @Field(() => LinkEntity, { nullable: true })
  link?: Link
}

@ObjectType()
export class UpdateLinkResponse extends CreateLinkResponse {}

@ObjectType()
export class EditLinksResponse extends BaseResponse {
  @Field(() => [LinkEntity], { nullable: true })
  links?: Link[]
}

@ObjectType()
export class CreateManyLinksResponse extends EditLinksResponse {}

@ObjectType()
export class UpdateManyLinksResponse extends EditLinksResponse {}
