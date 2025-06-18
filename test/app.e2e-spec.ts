import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { after } from 'node:test';
import { NestApplication } from '@nestjs/core';

describe('App e2e', () => {
  let app: INestApplication;
  beforeAll(async () => {
    // Initialize the application, connect to the database, etc.
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = await moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
  });
  afterAll(() => {
    // Close the application and clean up resources
    app.close();
  });
  it.todo('should pass all tests');
});
