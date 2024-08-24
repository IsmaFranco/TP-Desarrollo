import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity'; // Añadimos esta línea para importar la entidUsUsad Admin

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customersService.create(createCustomerDto);
  }

  @Get()
  findAll(): Promise<Customer[]> {
    return this.customersService.findAll();
  }

  @Get(':idUs')
  findOne(@Param('idUs') idUs: number): Promise<Customer> {
    return this.customersService.findOne(+idUs);
  }

  @Patch(':idUs')
  update(
    @Param('idUs') idUs: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.update(+idUs, updateCustomerDto);
  }

  @Delete(':idUs')
  remove(@Param('idUs') idUs: number): Promise<void> {
    // Cambiamos el tipo de retorno de Admin a voidUs pq no se, pero no debería retornar nada
    return this.customersService.remove(+idUs);
  }
}
