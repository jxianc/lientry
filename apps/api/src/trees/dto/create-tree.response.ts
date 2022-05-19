import { Field, ObjectType } from '@nestjs/graphql'
import { BaseResponse } from '../../utils/base.response'
import { Tree } from '../entities/tree.entity'

@ObjectType()
export class CreateTreeResponse extends BaseResponse {
  @Field(() => Tree, { nullable: true })
  tree?: Tree | null
}
