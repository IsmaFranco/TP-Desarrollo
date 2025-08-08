import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShipmentsService } from './shipments.service';
import { ShipmentsController } from './shipments.controller';
import { Shipment } from './entities/shipment.entity';
import { Locality } from 'src/localities/entities/locality.entity';
import { ShipmentsScheduler } from './shipment.scheduler';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment, Locality])],
  controllers: [ShipmentsController],
  providers: [ShipmentsService, ShipmentsScheduler],
  exports: [ShipmentsService],
})
export class ShipmentsModule {}
