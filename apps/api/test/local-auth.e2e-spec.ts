import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../src/app.module'
import { PrismaService } from '../src/prisma.service'
import { RegisterUserInput } from 'src/auth/dto/register-user.input'

describe('local auth e2e test', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    prisma = app.get<PrismaService>(PrismaService)

    await app.init()
  })

  afterAll(async () => {
    await prisma.$disconnect()
    await app.close()
  })

  describe('register mutation', () => {
    const registerMutation = `
      mutation Register($registerUserInput: RegisterUserInput!) {
        register(registerUserInput: $registerUserInput) {
          accessToken
          errMsg
          success
          user {
            id
            email
            username
          }
        }
      }
    `
    const newUserInput: RegisterUserInput = {
      email: 'testuser01@gmail.com',
      password: 'asdasdasd',
      username: 'testuser01',
    }

    const loginMutation = `
      mutation Login($loginUserInput: LoginUserInput!) {
        login(loginUserInput: $loginUserInput) {
          accessToken
          errMsg
          success
          user {
            id
            email
            username
          }
        }
      }
    `

    it('should register a new user', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: registerMutation,
          variables: {
            registerUserInput: newUserInput,
          },
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.register.success).toBeTruthy()
          expect(res.body.data.register.accessToken).toBeTruthy()
          expect(res.body.data.register.errMsg).toBeNull()
          expect(res.body.data.register.user.email).toBe(newUserInput.email)
          expect(res.body.data.register.user.username).toBe(
            newUserInput.username,
          )
        })
    })

    it('should found the new user', async () => {
      const user = await prisma.user.findUnique({
        where: {
          email: newUserInput.email,
        },
      })
      expect(user?.email).toBe(newUserInput.email)
      expect(user?.username).toBe(newUserInput.username)
    })

    it('should able to login', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: loginMutation,
          variables: {
            loginUserInput: {
              email: newUserInput.email,
              password: newUserInput.password,
            },
          },
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.login.success).toBeTruthy()
          expect(res.body.data.login.accessToken).toBeTruthy()
          expect(res.body.data.login.errMsg).toBeNull()
          expect(res.body.data.login.user.email).toBe(newUserInput.email)
          expect(res.body.data.login.user.username).toBe(newUserInput.username)
        })
    })

    // it('user table should have refreshtoken')

    // it('should return a accesstoken')

    // it('should get refreshtoken coookie')
  })
})
