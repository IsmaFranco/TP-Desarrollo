import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LocalitiesService } from './localities.service';
import { CreateLocalityDto } from './dto/create-locality.dto';
import { UpdateLocalityDto } from './dto/update-locality.dto';
import { Locality } from './entities/locality.entity';

@Controller('localities')
export class LocalitiesController {
  constructor(private readonly localitiesService: LocalitiesService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createLocalityDto: CreateLocalityDto): Promise<Locality> {
    return this.localitiesService.create(createLocalityDto);
  }

  @Get()
  findAll(): Promise<Locality[]> {
    return this.localitiesService.findAll();
  }

  @Get(':idLo')
  findOne(@Param('idLo') idLo: number): Promise<Locality> {
    return this.localitiesService.findOne(+idLo);
  }

  @Patch(':idLo')
  update(
    @Param('idLo') idLo: number,
    @Body() updateLocalityDto: UpdateLocalityDto,
  ): Promise<Locality> {
    return this.localitiesService.update(+idLo, updateLocalityDto);
  }

  @Delete(':idLo')
  remove(@Param('idLo') idLo: number): Promise<void> {
    return this.localitiesService.remove(+idLo);
  }
}
