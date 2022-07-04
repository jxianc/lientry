import { Field, ObjectType } from '@nestjs/graphql'
import { Link, Tree } from '@prisma/client'
import { TreeEntity } from 'src/trees/entities/tree.entity'
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
  @Field(() => TreeEntity, { nullable: true })
  tree?: Tree
}

@ObjectType()
export class CreateManyLinksResponse extends BaseResponse {}

@ObjectType()
export class UpdateManyLinksResponse extends BaseResponse {}
