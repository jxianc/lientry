import { AuthGuard } from '@nestjs/passport'

// github oauth strategy
export class GithubAuthGuard extends AuthGuard('github') {}
