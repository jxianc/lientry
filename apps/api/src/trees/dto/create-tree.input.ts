import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateTreeInput {
  @Field()
  name!: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => Boolean, { nullable: true })
  isPublic?: boolean
}
