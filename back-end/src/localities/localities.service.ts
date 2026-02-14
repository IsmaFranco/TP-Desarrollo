import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLocalityDto } from './dto/create-locality.dto';
import { UpdateLocalityDto } from './dto/update-locality.dto';
import { Locality } from './entities/locality.entity';

@Injectable()
export class LocalitiesService {
  constructor(
    @InjectRepository(Locality)
    private localityRepository: Repository<Locality>,
  ) {}

  create(createLocalityDto: CreateLocalityDto): Promise<Locality> {
    const locality = this.localityRepository.create(createLocalityDto);
    return this.localityRepository.save(locality);
  }

  findAll(): Promise<Locality[]> {
    return this.localityRepository.find();
  }

  findActiveLocalities(): Promise<Locality[]> {
    return this.localityRepository.find({ where: { isActive: true } });
  }

  findOne(idLo: number): Promise<Locality> {
    return this.localityRepository.findOne({
      where: { idLo: idLo, isActive: true },
    });
  }

  async update(
    idLo: number,
    updateLocalityDto: UpdateLocalityDto,
  ): Promise<Locality> {
    await this.localityRepository.update(idLo, updateLocalityDto);
    return this.findOne(idLo);
  }

  async remove(idLo: number): Promise<void> {
    await this.localityRepository.update(idLo, { isActive: false });
  }

  async activate(idLo: number): Promise<void> {
    await this.localityRepository.update(idLo, { isActive: true });
  }
}
