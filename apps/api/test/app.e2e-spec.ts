import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import request from 'supertest'
import { AppModule } from './../src/app.module'

describe('app E2E test', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return world', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: 'query Greeting { greeting }',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.greeting).toBe('hello world')
      })
  })
})
