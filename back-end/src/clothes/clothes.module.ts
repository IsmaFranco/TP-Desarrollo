import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';
import { Clothe } from './entities/clothe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clothe])],
  controllers: [ClothesController],
  providers: [ClothesService],
  exports: [ClothesService],
})
export class ClothesModule {}
