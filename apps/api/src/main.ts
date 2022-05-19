import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  await app.listen(process.env.PORT)
  console.log(
    `[Lientry]: GraphQL API server is currently running at http://localhost:${process.env.PORT}/graphql`,
  )
}
bootstrap()
