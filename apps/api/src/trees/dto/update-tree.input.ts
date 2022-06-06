import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateTreeInput {
  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Boolean, { nullable: true })
  isPublic?: boolean
}
