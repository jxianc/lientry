import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class BaseEntity {
  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date
}
