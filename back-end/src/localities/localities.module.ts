import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalitiesService } from './localities.service';
import { LocalitiesController } from './localities.controller';
import { Locality } from './entities/locality.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Locality])],
  controllers: [LocalitiesController],
  providers: [LocalitiesService],
  exports: [TypeOrmModule],
})
export class LocalitiesModule {}
