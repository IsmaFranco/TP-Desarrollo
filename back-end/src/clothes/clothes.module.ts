import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClothesService } from './clothes.service';
import { ClothesController } from './clothes.controller';
import { Clothe } from './entities/Clothe.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Clothe])],
  controllers: [ClothesController],
  providers: [ClothesService],
})
export class ClothesModule {}
