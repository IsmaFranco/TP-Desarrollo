import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocalitiesService } from './localities.service';
import { CreateLocalityDto } from './dto/create-locality.dto';
import { UpdateLocalityDto } from './dto/update-locality.dto';

@Controller('localities')
export class LocalitiesController {
  constructor(private readonly localitiesService: LocalitiesService) {}

  @Post()
  create(@Body() createLocalityDto: CreateLocalityDto) {
    return this.localitiesService.create(createLocalityDto);
  }

  @Get()
  findAll() {
    return this.localitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.localitiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocalityDto: UpdateLocalityDto) {
    return this.localitiesService.update(+id, updateLocalityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.localitiesService.remove(+id);
  }
}
