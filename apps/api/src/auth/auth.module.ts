import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { UsersService } from '../users/users.service'
import { PrismaService } from '../prisma.service'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from './strategies/local.strategy'

@Module({
  imports: [PassportModule, JwtModule.register({})],
  providers: [
    AuthResolver,
    AuthService,
    UsersService,
    PrismaService,
    LocalStrategy,
  ],
})
export class AuthModule {}
