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

@InputType()
export class UpdateLinkInput {
  @Field()
  linkId!: string

  @Field(() => String, { nullable: true })
  title?: string | null

  @Field(() => String, { nullable: true })
  description?: string | null

  @Field(() => String, { nullable: true })
  url?: string | null
}

@InputType()
export class RemoveLinkInput {
  @Field()
  linkId!: string
}

@InputType()
export class EditLinksInput {
  @Field(() => [CreateLinkInput], { nullable: true })
  creates?: CreateLinkInput[] | null

  @Field(() => [UpdateLinkInput], { nullable: true })
  updates?: UpdateLinkInput[] | null

  @Field(() => [RemoveLinkInput], { nullable: true })
  removes?: RemoveLinkInput[] | null
}
