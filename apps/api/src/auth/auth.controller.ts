import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { GoogleUser } from './dto/google.user'
import { GoogleAuthGuard } from './guards/google.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  googleLogin(@Req() req: Request, @Res() res: Response) {
    console.log(req.user)
    res.status(200).send({ msg: 'logged in' })
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  async googleRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as GoogleUser
    const response = await this.authService.oauthLogin(
      user.id,
      user.provider,
      user,
      res,
    )
    res.status(200).send(response)
    return response
  }
}
