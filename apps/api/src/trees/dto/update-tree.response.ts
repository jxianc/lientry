import { ObjectType } from '@nestjs/graphql'
import { CreateTreeResponse } from './create-tree.response'

@ObjectType()
export class UpdateTreeResponse extends CreateTreeResponse {}
