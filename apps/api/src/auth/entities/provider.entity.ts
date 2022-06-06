import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '@prisma/client'
import { UserEntity } from '../../users/entities/user.entity'

@ObjectType()
export class ProviderEntity {
  @Field()
  id!: string

  @Field()
  providerId!: string

  @Field()
  providerName!: string

  @Field(() => UserEntity)
  user!: User
}
