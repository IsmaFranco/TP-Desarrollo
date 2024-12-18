import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { User } from '../users/entities/user.entity';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Rol } from 'src/common/enums/rol.enum'; 



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

  async findOne(idPu: number, user: UserActiveInterface): Promise<Purchase> {
    const purchase = await this.purchaseRepository.findOneBy({ idPu });

    if (!purchase) {
      throw new BadRequestException('La compra no existe');
    }

    this.validateOwnership(purchase, user);

    return purchase;
  }

  async update(idPu: number,updatePurchaseDto: UpdatePurchaseDto, user: UserActiveInterface): Promise<Purchase> {
    await this.findOne(idPu, user);

    await this.purchaseRepository.update(idPu, {...updatePurchaseDto});
    return this.findOne(idPu, user); // Devuelve la compra actualizada
  }

  async remove(idPu: number, user: UserActiveInterface): Promise<void> {
    await this.findOne(idPu, user);
    await this.purchaseRepository.delete({ idPu });
    return;
  }

  async findOneCloth(idPu: number) {
    return this.purchaseRepository.findOne({
      where: { idPu: idPu },
      relations: ['clothes'], 
    });
  }

  private validateOwnership(purchase: Purchase, user: UserActiveInterface) {
    if (!user.rol.includes(Rol.ADMIN) && purchase.user.idUs !== user.idUs) {
      throw new UnauthorizedException('No tienes permisos para ver esta compra');
    }
  } // valida si el usuario tiene permisos para ver la compra
}
