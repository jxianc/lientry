import { ObjectType, Field } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { BaseEntity } from '../../base/base.entity'
import { LinkEntity } from '../../links/entities/link.entity'
import { UserEntity } from '../../users/entities/user.entity'

@ObjectType()
export class TreeEntity extends BaseEntity {
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

  @Field(() => UserEntity)
  user!: User

  @Field(() => [LinkEntity], { nullable: true })
  links?: LinkEntity[] | null
}
