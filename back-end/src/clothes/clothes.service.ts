import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClotheDto } from './dto/create-clothe.dto';
import { UpdateClotheDto } from './dto/update-clothe.dto';
import { Clothe } from './entities/clothe.entity';

@Injectable()
export class ClothesService {
  constructor(
    @InjectRepository(Clothe)
    private clotheRepository: Repository<Clothe>,
  ) {}

  create(createClotheDto: CreateClotheDto): Promise<Clothe> {
    const clothe = this.clotheRepository.create(createClotheDto);
    return this.clotheRepository.save(clothe);
  }

  findAll(): Promise<Clothe[]> {
    return this.clotheRepository.find();
  }

  findOne(idCl: number): Promise<Clothe> {
    return this.clotheRepository.findOne({ where: { idCl: idCl } });
  }

  async update(
    idCl: number,
    updateClotheDto: UpdateClotheDto,
  ): Promise<Clothe> {
    await this.clotheRepository.update(idCl, updateClotheDto);
    return this.findOne(idCl);
  }

  async remove(idCl: number): Promise<void> {
    await this.clotheRepository.delete(idCl);
  }

}
