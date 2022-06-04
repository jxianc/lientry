import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { User } from '../../users/entities/user.entity'
import { AuthService } from '../auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validate(email, password)

    if (!user) {
      throw new UnauthorizedException('Email or password is invalid')
    }

    // attach user in request
    return user
  }
}
