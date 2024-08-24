import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private supplierRepository: Repository<Supplier>,
  ) {}

  create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const supplier = this.supplierRepository.create(createSupplierDto);
    return this.supplierRepository.save(supplier);
  }

  findAll(): Promise<Supplier[]> {
    return this.supplierRepository.find();
  }

  findOne(idUs: number): Promise<Supplier> {
    return this.supplierRepository.findOne({ where: { idUs: idUs } });
  }

  async update(
    idUs: number,
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<Supplier> {
    await this.supplierRepository.update(idUs, updateSupplierDto);
    return this.findOne(idUs);
  }

  async remove(idUs: number): Promise<void> {
    await this.supplierRepository.delete(idUs);
  }
}
