import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { LocalitiesModule } from 'src/localities/localities.module';
import { LocalitiesService } from 'src/localities/localities.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LocalitiesModule], //ver bien si es necesario importar LocalitiesModule o si es con loca
  controllers: [UsersController],
  providers: [UsersService, LocalitiesService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
