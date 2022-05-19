import { Module } from '@nestjs/common'
import { TreesService } from './trees.service'
import { TreesResolver } from './trees.resolver'
import { PrismaService } from '../prisma.service'

@Module({
  providers: [TreesResolver, TreesService, PrismaService],
})
export class TreesModule {}
