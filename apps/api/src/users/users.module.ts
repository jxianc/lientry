import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { PrismaService } from '../prisma.service'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy'

@Module({
  imports: [JwtModule.register({})],
  providers: [UsersResolver, UsersService, PrismaService, JwtStrategy],
})
export class UsersModule {}
