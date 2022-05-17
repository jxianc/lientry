import { Field, ObjectType } from '@nestjs/graphql'
import { User } from '../../users/entities/user.entity'

@ObjectType()
export class Provider {
  @Field()
  id!: string

  @Field()
  providerId!: string

  @Field()
  providerName!: string

  @Field(() => User)
  user!: User
}
