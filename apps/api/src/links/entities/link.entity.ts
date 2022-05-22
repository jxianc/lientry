import { Field, ObjectType } from '@nestjs/graphql'
import { Tree } from '../../trees/entities/tree.entity'
import { BaseEntity } from '../../base/base.entity'

@ObjectType()
export class Link extends BaseEntity {
  @Field()
  id!: string

  @Field()
  title!: string

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field()
  url!: string

  @Field(() => Tree)
  tree!: Tree
}
