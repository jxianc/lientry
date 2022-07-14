import { Field, ObjectType } from '@nestjs/graphql'
import { Tree, User } from '@prisma/client'
import { UserEntity } from '../../users/entities/user.entity'
import { TreeEntity } from './tree.entity'

@ObjectType()
export class UserSavedTreeEntity {
  @Field(() => UserEntity)
  user!: User

  @Field(() => TreeEntity)
  tree!: Tree
}
