import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  /* async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const purchase = this.purchaseRepository.create(createPurchaseDto);
    return this.purchaseRepository.save(purchase);
  } */ 
  async create (createPurchaseDto: CreatePurchaseDto, users: UserActiveInterface): Promise<Purchase> {
    const user = await this.userRepository.findOneBy({
      emailUs: createPurchaseDto.user,
    });
    
    if (!user) {
      throw new BadRequestException('User not found');
    }

    return await this.purchaseRepository.save({
      ...createPurchaseDto,
      user,
    });

    //return this.purchaseRepository.save(purchase);
  } // esto sirve para que el usuario pueda hacer una compra y se guarde en la base de datos y se asocie con el usuario que la hizo

  async findAll(idUs: number, users: UserActiveInterface): Promise<Purchase[]> {
    if (users.rol.includes(Rol.ADMIN)) { // si el usuario es admin, puede ver todas las compras
      return await this.purchaseRepository.find({
        relations: ['user', 'shipment', 'clothes'],
      });
    }
    return await this.purchaseRepository.find({
      where: { user: { idUs: idUs } },
      relations: ['user', 'shipment', 'clothes'],
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
}
