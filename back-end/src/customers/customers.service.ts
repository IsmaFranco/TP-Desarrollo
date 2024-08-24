import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerDto);
    return this.customerRepository.save(createCustomerDto);
  }

  findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  findOne(idUs: number): Promise<Customer> {
    return this.customerRepository.findOne({ where: { idUs: idUs } });
  }

  async update(
    idUs: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    await this.customerRepository.update(idUs, updateCustomerDto);
    return this.findOne(idUs);
  }

  async remove(idUs: number): Promise<void> {
    await this.customerRepository.delete(idUs);
  }
}
