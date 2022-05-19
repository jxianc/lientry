import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class AuthResponse {
  @Field()
  success!: boolean

  @Field(() => String, { nullable: true })
  errMsg?: string | undefined

  @Field(() => String, { nullable: true })
  accessToken?: string | null
}
