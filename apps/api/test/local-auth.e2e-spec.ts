import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from '../src/app.module'
import { PrismaService } from '../src/prisma.service'

// describe('local auth e2e test', () => {
//   let app: INestApplication
//   let prisma: PrismaService

//   beforeAll(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile()

//     app = moduleFixture.createNestApplication()
//     prisma = app.get<PrismaService>(PrismaService)

//     await app.init()
//   })

//   afterAll(async () => {
//     await prisma.$disconnect()
//     await app.close()
//   })

//   describe('register mutation', () => {
//     const registerMutation =

//     it('database should have new user', () => {
//       request(app.getHttpServer())
//         .post('/graphql')
//         .send({
//           query: '',
//           variables
//         })
//     })
//     it('user table should have refreshtoken')
//     it('should return a accesstoken')
//     it('should get refreshtoken coookie')
//   })
// })
