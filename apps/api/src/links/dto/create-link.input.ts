import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateLinkInput {
  @Field()
  title!: string

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field()
  url!: string
}
