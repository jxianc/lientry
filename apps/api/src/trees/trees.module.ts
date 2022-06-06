import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { PrismaService } from '../prisma.service'
import { TreesResolver } from './trees.resolver'
import { TreesService } from './trees.service'

@Module({
  imports: [JwtModule.register({})],
  providers: [TreesResolver, TreesService, PrismaService, UsersService],
})
export class TreesModule {}
