import { Field, ObjectType } from '@nestjs/graphql'
import { TreeEntity } from '../../trees/entities/tree.entity'
import { ProviderEntity } from '../../auth/entities/provider.entity'
import { BaseEntity } from '../../base/base.entity'
import { Provider, Tree } from '@prisma/client'

@ObjectType()
export class UserEntity extends BaseEntity {
  @Field()
  id!: string

  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  email?: string

  password?: string

  @Field(() => String, { nullable: true })
  image?: string

  refreshToken?: string

  @Field(() => ProviderEntity, { nullable: true })
  provider?: Provider

  @Field(() => [TreeEntity], { nullable: true })
  trees?: Tree[]
}
