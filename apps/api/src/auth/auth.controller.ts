import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { OAuthUser } from './dto/oauth.user'
import { GithubAuthGuard } from './guards/github.guard'
import { GoogleAuthGuard } from './guards/google.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  googleLogin(@Res() res: Response) {
    res.status(200).send({ msg: 'logged in' })
  }

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  async googleRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as OAuthUser
    const response = await this.authService.oauthLogin(user, res)
    res.redirect(process.env.CLIENT_ORIGIN)
    return response
  }

  @UseGuards(GithubAuthGuard)
  @Get('github')
  githubLogin(@Res() res: Response) {
    res.status(200).send({ msg: 'logged in' })
  }

  @UseGuards(GithubAuthGuard)
  @Get('github/redirect')
  async githubRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as OAuthUser
    const response = await this.authService.oauthLogin(user, res)
    res.redirect(process.env.CLIENT_ORIGIN)
    return response
  }
}
