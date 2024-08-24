import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LocalitiesService } from './localities.service';
import { CreateLocalityDto } from './dto/create-locality.dto';
import { UpdateLocalityDto } from './dto/update-locality.dto';
import { Locality } from './entities/locality.entity';

@Controller('localities')
export class LocalitiesController {
  constructor(private readonly localitiesService: LocalitiesService) {}

  @Post()
  create(@Body() createLocalityDto: CreateLocalityDto): Promise<Locality> {
    return this.localitiesService.create(createLocalityDto);
  }

  @Get()
  findAll(): Promise<Locality[]> {
    return this.localitiesService.findAll();
  }

  @Get(':postalCode')
  findOne(@Param('postalCode') postalCode: number): Promise<Locality> {
    return this.localitiesService.findOne(+postalCode);
  }

  @Patch(':postalCode')
  update(
    @Param('postalCode') postalCode: number,
    @Body() updateLocalityDto: UpdateLocalityDto,
  ): Promise<Locality> {
    return this.localitiesService.update(+postalCode, updateLocalityDto);
  }

  @Delete(':postalCode')
  remove(@Param('postalCode') postalCode: number): Promise<Locality> {
    return this.localitiesService.remove(+postalCode);
  }
}
