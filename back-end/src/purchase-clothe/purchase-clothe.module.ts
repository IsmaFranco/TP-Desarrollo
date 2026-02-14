import { Module } from '@nestjs/common';
import { PurchaseClotheService } from './purchase-clothe.service';
import { PurchaseClotheController } from './purchase-clothe.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseClothe } from './entities/purchase-clothe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseClothe])],
  providers: [PurchaseClotheService],
  controllers: [PurchaseClotheController],
  exports: [PurchaseClotheService],
})
export class PurchaseClotheModule {}
