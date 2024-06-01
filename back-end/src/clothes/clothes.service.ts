import { Injectable } from '@nestjs/common';
import { CreateClotheDto } from './dto/create-clothe.dto';
import { UpdateClotheDto } from './dto/update-clothe.dto';

@Injectable()
export class ClothesService {
  create(createClotheDto: CreateClotheDto) {
    return 'This action adds a new clothe';
  }

  findAll() {
    return `This action returns all clothes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clothe`;
  }

  update(id: number, updateClotheDto: UpdateClotheDto) {
    return `This action updates a #${id} clothe`;
  }

  remove(id: number) {
    return `This action removes a #${id} clothe`;
  }
}
