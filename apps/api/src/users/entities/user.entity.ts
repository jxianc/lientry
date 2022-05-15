import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field()
  id!: string

  @Field(() => String, { nullable: true })
  username?: string | null

  @Field()
  email!: string

  password?: string | null

  @Field(() => String, { nullable: true })
  image?: string | null

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date

  refreshToken?: string | null

  // todo: providers and trees
}
