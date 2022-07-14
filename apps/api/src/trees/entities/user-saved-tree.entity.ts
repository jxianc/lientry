import { Field, ObjectType } from '@nestjs/graphql'
import { Tree, User } from '@prisma/client'
import { BaseEntity } from '../../base/base.entity'
import { UserEntity } from '../../users/entities/user.entity'
import { TreeEntity } from './tree.entity'

@ObjectType()
export class UserSavedTreeEntity extends BaseEntity {
  @Field(() => UserEntity)
  user!: User

  @Field(() => TreeEntity)
  tree!: Tree
}
