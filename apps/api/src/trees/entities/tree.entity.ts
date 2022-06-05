import { ObjectType, Field } from '@nestjs/graphql'
import { BaseEntity } from '../../base/base.entity'
import { Link } from '../../links/entities/link.entity'
import { User } from '../../users/entities/user.entity'

@ObjectType()
export class Tree extends BaseEntity {
  @Field()
  id!: string

  @Field()
  name!: string

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field()
  viewed!: number

  @Field()
  isPublic!: boolean

  @Field(() => User)
  user!: User

  @Field(() => [Link], { nullable: true })
  links?: Link[] | null
}
