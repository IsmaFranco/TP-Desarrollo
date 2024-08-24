import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
  ) {}
  create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const purchase = this.purchaseRepository.create(createPurchaseDto);
    return this.purchaseRepository.save(purchase);
  }

  findAll(): Promise<Purchase[]> {
    return this.purchaseRepository.find();
  }

  findOne(idPu: number): Promise<Purchase> {
    return this.purchaseRepository.findOne({ where: { idPu: idPu } });
  }

  async update(
    idPu: number,
    updatePurchaseDto: UpdatePurchaseDto,
  ): Promise<Purchase> {
    await this.purchaseRepository.update(idPu, updatePurchaseDto);
    return this.findOne(idPu);
  }

  async remove(idPu: number): Promise<void> {
    await this.purchaseRepository.delete(idPu);
  }
}
