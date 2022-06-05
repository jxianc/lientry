import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateTreeInput {
  @Field()
  name!: string

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field(() => Boolean, { nullable: true })
  isPublic?: boolean | null
}
