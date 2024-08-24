import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { Shipment } from './entities/shipment.entity';

@Injectable()
export class ShipmentsService {
  constructor(
    @InjectRepository(Shipment)
    private shipmentRepository: Repository<Shipment>,
  ) {}

  create(createShipmentDto: CreateShipmentDto): Promise<Shipment> {
    const shipment = this.shipmentRepository.create(createShipmentDto);
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
}
