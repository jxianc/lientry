import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class UpdateTreeInput {
  @Field()
  treeId!: string

  @Field(() => String, { nullable: true })
  name?: string | null

  @Field(() => String, { nullable: true })
  description?: string | null
}
