import { ObjectType, Field } from '@nestjs/graphql'
import { User } from '../../users/entities/user.entity'

@ObjectType()
export class Tree {
  @Field()
  id!: string

  @Field()
  name!: string

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date

  @Field(() => User)
  user!: User

  // todo: links
}
