import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { LocalitiesModule } from 'src/localities/localities.module';
import { LocalitiesService } from 'src/localities/localities.service';
import { Purchase } from 'src/purchases/entities/purchase.entity';
import { Shipment } from 'src/shipments/entities/shipment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Purchase, Shipment]), LocalitiesModule],
  controllers: [UsersController],
  providers: [UsersService, LocalitiesService],
  exports: [UsersService],
})
export class UsersModule { }
