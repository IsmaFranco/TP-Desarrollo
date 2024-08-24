import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { Province } from './entities/province.entity';

@Injectable()
export class ProvincesService {
  constructor(
    @InjectRepository(Province)
    private provinceRepository: Repository<Province>,
  ) {}

  create(createProvinceDto: CreateProvinceDto): Promise<Province> {
    const province = this.provinceRepository.create(createProvinceDto);
    return this.provinceRepository.save(province);
  }

  findAll(): Promise<Province[]> {
    return this.provinceRepository.find();
  }

  findOne(idPr: number): Promise<Province> {
    return this.provinceRepository.findOne({ where: { idPr: idPr } });
  }

  async update(
    idPr: number,
    updateProvinceDto: UpdateProvinceDto,
  ): Promise<Province> {
    await this.provinceRepository.update(idPr, updateProvinceDto);
    return this.findOne(idPr);
  }

  async remove(idPr: number): Promise<void> {
    await this.provinceRepository.delete(idPr);
  }
}
