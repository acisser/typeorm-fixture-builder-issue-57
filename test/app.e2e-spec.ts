import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { clear, collect, install } from 'typeorm-fixture-builder';
import { Connection } from 'typeorm';
import { getConnectionToken } from '@nestjs/typeorm';
import * as customer_bundle from './customer.bundle';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    connection = moduleFixture.get<Connection>(getConnectionToken('default'));
  });

  beforeEach(async () => {
    await connection.query('DELETE FROM customer_entity;');
    await connection.query('DELETE FROM one_time_charge;');
    await connection.query('DELETE FROM deployment;');
    await connection.query('DELETE FROM billing;');
    await connection.query('DELETE FROM rate_card_item;');
    await connection.query(
      "SELECT pg_catalog.setval('customer_entity_id_seq', 1, false);",
    );
  });

  afterEach(() => {
    clear();
  });

  it('/ (GET)', async () => {
    await install(connection, collect(customer_bundle));
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  it('/ (DELETE)', async () => {
    await install(connection, collect(customer_bundle));
    request(app.getHttpServer()).delete('/1').expect(200);
    request(app.getHttpServer()).post('/').expect(200);
  });

  it('/ (GET2)', async () => {
    await install(connection, collect(customer_bundle));
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
