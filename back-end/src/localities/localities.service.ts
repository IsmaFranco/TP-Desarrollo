import { Injectable } from '@nestjs/common';
import { CreateLocalityDto } from './dto/create-locality.dto';
import { UpdateLocalityDto } from './dto/update-locality.dto';

@Injectable()
export class LocalitiesService {
  create(createLocalityDto: CreateLocalityDto) {
    return 'This action adds a new locality';
  }

  findAll() {
    return `This action returns all localities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} locality`;
  }

  update(id: number, updateLocalityDto: UpdateLocalityDto) {
    return `This action updates a #${id} locality`;
  }

  remove(id: number) {
    return `This action removes a #${id} locality`;
  }
}
