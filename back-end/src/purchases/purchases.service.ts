import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { User } from '../users/entities/user.entity';
import { Rol } from 'src/common/enums/rol.enum'; 



@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
  ) {}

  async create (createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const purchase = this.purchaseRepository.create(createPurchaseDto);
    return this.purchaseRepository.save(purchase);
  }

  async findAll(): Promise<Purchase[]> {
      return await this.purchaseRepository.find({
        relations: ['shipment', 'clothes', 'user'], // Incluye las relaciones necesarias
      });
  }

  async findOne(idPu: number): Promise<Purchase> {
    const purchase = await this.purchaseRepository.findOneBy({ idPu });

    if (!purchase) {
      throw new BadRequestException('La compra no existe');
    }

    return purchase;
  }

  async update(idPu: number,updatePurchaseDto: UpdatePurchaseDto): Promise<Purchase> {
    await this.findOne(idPu);

    await this.purchaseRepository.update(idPu, {...updatePurchaseDto});
    return this.findOne(idPu); // Devuelve la compra actualizada
  }

  async remove(idPu: number): Promise<void> {
    await this.findOne(idPu);
    await this.purchaseRepository.delete({ idPu });
    return;
  }

  async findOneCloth(idPu: number) {
    return this.purchaseRepository.findOne({
      where: { idPu: idPu },
      relations: ['clothes'], 
    });
  }

  async findAllByDate(date1: string, date2: string): Promise<Purchase[]> {
    return this.purchaseRepository.find({
      where: {
        datePu: Between(new Date(date1), new Date(date2)),
      },
    });
  }

}
