import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  initializeTransactionalContext,
  patchTypeORMRepositoryWithBaseRepository,
} from 'typeorm-transactional-cls-hooked';
import { AdminModule } from '@adminjs/nestjs';
import { Connection } from 'typeorm';
import AdminJS from 'adminjs';
import { Database, Resource } from '@adminjs/typeorm';

AdminJS.registerAdapter({ Database, Resource });
console.log(__dirname);
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      username: 'postgres',
      password: 'postgres',
      port: 5432,
      database: 'postgres',
      entities: [__dirname + '/*.entity.{js,ts}'],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    AdminModule.createAdminAsync({
      imports: [],
      useFactory: (connection: Connection) => ({
        adminJsOptions: {
          rootPath: '/admin',
          databases: [connection],
        },
      }),
      inject: [Connection],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnApplicationBootstrap {
  onApplicationBootstrap(): void {
    initializeTransactionalContext();
    patchTypeORMRepositoryWithBaseRepository();
  }
}
