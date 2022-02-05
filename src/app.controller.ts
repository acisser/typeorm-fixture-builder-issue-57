import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomerEntity } from './customer.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return await this.appService.getHello();
  }

  @Delete(':id')
  async deleteCustomer(@Param('id') id: number): Promise<void> {
    return await this.appService.deleteCustomer(id);
  }

  @Post()
  async saveCustomer(): Promise<CustomerEntity> {
    return await this.appService.saveCustomer();
  }
}
