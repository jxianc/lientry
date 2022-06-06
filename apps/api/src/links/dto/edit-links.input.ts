import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateLinkInput {
  @Field()
  title!: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field()
  url!: string
}

@InputType()
export class UpdateLinkInput {
  @Field()
  linkId!: string

  @Field(() => String, { nullable: true })
  title?: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => String, { nullable: true })
  url?: string
}

@InputType()
export class RemoveLinkInput {
  @Field()
  linkId!: string
}

@InputType()
export class EditLinksInput {
  @Field(() => [CreateLinkInput], { nullable: true })
  creates?: CreateLinkInput[]

  @Field(() => [UpdateLinkInput], { nullable: true })
  updates?: UpdateLinkInput[]

  @Field(() => [RemoveLinkInput], { nullable: true })
  removes?: RemoveLinkInput[]
}
