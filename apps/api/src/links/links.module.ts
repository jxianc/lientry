import { Module } from '@nestjs/common'
import { LinksService } from './links.service'
import { LinksResolver } from './links.resolver'
import { PrismaService } from '../prisma.service'
import { TreesService } from '../trees/trees.service'

@Module({
  providers: [LinksResolver, LinksService, PrismaService, TreesService],
})
export class LinksModule {}
