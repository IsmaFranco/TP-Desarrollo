import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { CreateClotheDto } from './dto/create-clothe.dto';
import { UpdateClotheDto } from './dto/update-clothe.dto';

@Controller('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) {}

  @Post()
  create(@Body() createClotheDto: CreateClotheDto) {
    return this.clothesService.create(createClotheDto);
  }

  @Get()
  findAll() {
    return this.clothesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clothesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClotheDto: UpdateClotheDto) {
    return this.clothesService.update(+id, updateClotheDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clothesService.remove(+id);
  }
}
