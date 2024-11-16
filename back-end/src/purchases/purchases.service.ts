import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { User } from '../users/entities/user.entity';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Rol } from 'src/common/enums/rol.enum'; // Adjust the import path as necessary


@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
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

  async findOneCloth(idPu: number) {
    // Esta consulta recupera la compra con todas las "clothes" asociadas
    return this.purchaseRepository.findOne({
      where: { idPu: idPu },
      relations: ['clothes'], // Esta opción carga la relación desde la tabla de unión
    });
  }

}
