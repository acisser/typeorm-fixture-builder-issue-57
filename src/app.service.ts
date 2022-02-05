import { Injectable } from '@nestjs/common';
import { CustomerEntity } from './customer.entity';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private connection: Connection) {}

  async getHello(): Promise<string> {
    const repo = this.connection.getRepository(CustomerEntity);
    await repo.find();
    return 'Hello World!';
  }

  @Transactional()
  async deleteCustomer(id: number): Promise<void> {
    const repo = this.connection.getRepository(CustomerEntity);
    await repo.delete(id);
  }

  async saveCustomer(): Promise<CustomerEntity> {
    const repo = this.connection.getRepository(CustomerEntity);
    return await repo.save({ name: 'Netflix' });
  }
}
