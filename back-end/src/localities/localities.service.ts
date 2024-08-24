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

  findOne(postalCode: number): Promise<Locality> {
    return this.localityRepository.findOne({
      where: { postalCode: postalCode },
    });
  }

  async update(
    postalCode: number,
    updateLocalityDto: UpdateLocalityDto,
  ): Promise<Locality> {
    await this.localityRepository.update(postalCode, updateLocalityDto);
    return this.findOne(postalCode);
  }

  async remove(postalCode: number): Promise<void> {
    await this.localityRepository.delete(postalCode);
  }
}
