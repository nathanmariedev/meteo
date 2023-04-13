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

  it('UserModule : list', async (done: jest.DoneCallback) => {
    await request(app.getHttpServer()).get('/users').expect(200);

    done();
  });

  it('UserModule : list with query params', async (done: jest.DoneCallback) => {
    await request(app.getHttpServer()).get('/users?limit=1&offset=1').expect(200);

    done();
  });
});
