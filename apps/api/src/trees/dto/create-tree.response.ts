import { Field, ObjectType } from '@nestjs/graphql'
import { Tree } from '@prisma/client'
import { BaseResponse } from '../../base/base.response'
import { TreeEntity } from '../entities/tree.entity'

@ObjectType()
export class CreateTreeResponse extends BaseResponse {
  @Field(() => TreeEntity, { nullable: true })
  tree?: Tree
}
