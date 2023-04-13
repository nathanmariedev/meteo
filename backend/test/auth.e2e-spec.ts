import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
      }),
    );
    await app.init();
  });

  afterAll(() => app.close());

  it('AuthModule : Login - wrong body', async (done: jest.DoneCallback) => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        emailzzz: 'test@wecraftapps.com',
        passwordzzz: 'thePassword',
      })
      .expect(400);

    done();
  });

  it('AuthModule : Register - wrong body', async (done: jest.DoneCallback) => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        emailz: 'test@wecraftapps.com',
        passwordz: 'thePassword',
      })
      .expect(400);

    done();
  });

  it('AuthModule : Register - ok body', async (done: jest.DoneCallback) => {
    // You need a correct SMTP_CONNECTION_STRING
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'test@wecraftapps.com',
        password: 'myVeryGoodPassword',
      })
      .expect(201);

    done();
  });

  it('AuthModule : Register - email already used', async (done: jest.DoneCallback) => {
    await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'test@wecraftapps.com',
        password: 'myVeryGoodPassword',
      })
      .expect(406);

    done();
  });

  it('AuthModule : Login - ok body', async (done: jest.DoneCallback) => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'user1@email.com',
        password: 'hellohello123',
      })
      .expect(200);

    done();
  });
});
