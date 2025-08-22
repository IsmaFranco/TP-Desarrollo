import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { Shipment, STATUS } from './entities/shipment.entity';
import { Locality } from 'src/localities/entities/locality.entity';

@Injectable()
export class ShipmentsService {
  constructor(
    @InjectRepository(Shipment)
    private shipmentRepository: Repository<Shipment>,
    @InjectRepository(Locality)
    private localitiesRepository: Repository<Locality>,
  ) {}

  async create(createShipmentDto: CreateShipmentDto): Promise<Shipment> {
    const locality = await this.localitiesRepository.findOne({ where: { idLo: createShipmentDto.idLocality } });
    if (!locality) {
      throw new Error('Locality not found');
    }

    const shipment = this.shipmentRepository.create({
      dateSh: createShipmentDto.dateSh,
      locality: locality,});
    return this.shipmentRepository.save(shipment);
  }

  findAll(): Promise<Shipment[]> {
    return this.shipmentRepository.find();
  }

  findOne(idSh: number): Promise<Shipment> {
    return this.shipmentRepository.findOne({ where: { idSh: idSh } });
  }

  async update(
    idSh: number,
    updateShipmentDto: UpdateShipmentDto,
  ): Promise<Shipment> {
    await this.shipmentRepository.update(idSh, updateShipmentDto);
    return this.findOne(idSh);
  }

  async remove(idSh: number): Promise<void> {
    await this.shipmentRepository.delete(idSh);
  }

  async updateShipmentsStatus(currentStatus: STATUS, newStatus: STATUS, minutes: number): Promise<void> {
    // calcula la fecha limite, envíos creados hace minutos se actualizan
    const now = new Date();
    const cutoffDate = new Date(now.getTime() - minutes * 60 * 1000);

    console.log(`Actualizando envíos de ${currentStatus} a ${newStatus} creados antes de ${cutoffDate.toLocaleString()}`);

    const result = await this.shipmentRepository.update(
      { status: currentStatus, dateSh: LessThan(cutoffDate) },
      { status: newStatus },
    );
    console.log(`Se actualizaron ${result.affected} envíos de ${currentStatus} a ${newStatus} \n`);
  }

}
