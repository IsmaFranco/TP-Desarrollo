import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';



@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>
  ) { }

  async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const purchase = this.purchaseRepository.create(createPurchaseDto);
    return await this.purchaseRepository.save(purchase);
  }

  async findAll(): Promise<Purchase[]> {
    return await this.purchaseRepository.find();
  }

  async findOne(idPu: number): Promise<Purchase> {
    const purchase = await this.purchaseRepository.findOneBy({ idPu });

    if (!purchase) {
      throw new BadRequestException('La compra no existe');
    }

    return purchase;
  }

  async update(idPu: number, updatePurchaseDto: UpdatePurchaseDto): Promise<Purchase> {
    await this.findOne(idPu);

    await this.purchaseRepository.update(idPu, { ...updatePurchaseDto });
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

  async findAllByDate(date1: string, date2: string): Promise<Purchase[]> { ///Tuve que armar las fechas manualmente porque las creaba con distinto huso horario
    let localDate1: Date = null;
    let localDate2: Date = null;
    let parts1: string[] = null;
    let parts2: string[] = null;
    parts1 = date1.split('-'); 
    localDate1 = new Date(Number(parts1[0]), Number(parts1[1]) - 1, Number(parts1[2]), 0, 0, 0);
    parts2 = date2.split('-'); 
    localDate2 = new Date(Number(parts2[0]), Number(parts2[1]) - 1, Number(parts2[2]), 23, 59, 59);
    return this.purchaseRepository.find({
      where: {
        datePu: Between(localDate1, localDate2),
      },
    });
  }

  findAllByUser(idUs: number): Promise<Purchase[]> {
    return this.purchaseRepository.find({
      where: { user: { idUs } },
      relations: ['user'],
    });
  }

  findOneByPayment(paymentId: string): Promise<Purchase> {
    return this.purchaseRepository.findOne({
      where: { paymentId: paymentId }
    });
  }

}
