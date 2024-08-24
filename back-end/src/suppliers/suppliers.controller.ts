import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    return this.suppliersService.create(createSupplierDto);
  }

  @Get()
  findAll(): Promise<Supplier[]> {
    return this.suppliersService.findAll();
  }

  @Get(':idUs')
  findOne(@Param('idUs') idUs: number): Promise<Supplier> {
    return this.suppliersService.findOne(+idUs);
  }

  @Patch(':idUs')
  update(
    @Param('idUs') idUs: number,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ): Promise<Supplier> {
    return this.suppliersService.update(+idUs, updateSupplierDto);
  }

  @Delete(':idUs')
  remove(@Param('idUs') idUs: number): Promise<void> {
    return this.suppliersService.remove(+idUs);
  }
}
