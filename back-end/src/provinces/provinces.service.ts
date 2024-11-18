import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { Province } from './entities/province.entity';

@Injectable()
export class ProvincesService {
  constructor(
    @InjectRepository(Province)
    private readonly provinceRepository: Repository<Province>,
  ) {}

  /* create(createProvinceDto: CreateProvinceDto): Promise<Province> {
    const province = this.provinceRepository.create(createProvinceDto);
    return this.provinceRepository.save(province);
  } lo comento pq deja que se vuelva a cargar una provincia repetida */
  async create(createProvinceDto: CreateProvinceDto): Promise<Province> {
    const existingProvince = await this.provinceRepository.findOneBy({
      namePr: createProvinceDto.namePr,
    });

    if (existingProvince) {
      throw new BadRequestException('Ya existe una provincia con ese nombre');
    }

    const province = this.provinceRepository.create(createProvinceDto);
    return this.provinceRepository.save(province);
  }// aca lo que hago es que no se pueda cargar una provincia repetida

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
