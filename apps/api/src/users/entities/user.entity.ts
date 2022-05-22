import { Field, ObjectType } from '@nestjs/graphql'
import { Tree } from '../../trees/entities/tree.entity'
import { Provider } from '../../auth/entities/provider.entity'
import { BaseEntity } from '../../base/base.entity'

@ObjectType()
export class User extends BaseEntity {
  @Field()
  id!: string

  @Field(() => String, { nullable: true })
  name?: string | null

  @Field(() => String, { nullable: true })
  email?: string | null

  password?: string | null

  @Field(() => String, { nullable: true })
  image?: string | null

  refreshToken?: string | null

  @Field(() => Provider, { nullable: true })
  provider?: Provider | null

  @Field(() => [Tree], { nullable: true })
  trees?: Tree[] | null
}
