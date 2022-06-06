import { Field, ObjectType } from '@nestjs/graphql'
import { TreeEntity } from '../../trees/entities/tree.entity'
import { BaseEntity } from '../../base/base.entity'
import { Tree } from '@prisma/client'

@ObjectType()
export class LinkEntity extends BaseEntity {
  @Field()
  id!: string

  @Field()
  title!: string

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field()
  url!: string

  @Field(() => TreeEntity)
  tree!: Tree
}
