import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { CreateClotheDto } from './dto/create-clothe.dto';
import { UpdateClotheDto } from './dto/update-clothe.dto';
import { Clothe } from './entities/clothe.entity'; // Añadimos esta línea para importar la entidClad Clothes

@Controller('clothes')
export class ClothesController {
  constructor(private readonly clothesService: ClothesService) {}

  @Post()
  create(@Body() createClotheDto: CreateClotheDto): Promise<Clothe> {
    return this.clothesService.create(createClotheDto);
  }

  @Get()
  findAll(): Promise<Clothe[]> {
    return this.clothesService.findAll();
  }

  @Get(':idCl')
  findOne(@Param('idCl') idCl: number): Promise<Clothe> {
    return this.clothesService.findOne(idCl);
  }

  @Patch(':idCl')
  update(
    @Param('idCl') idCl: number,
    @Body() updateClotheDto: UpdateClotheDto,
  ): Promise<Clothe> {
    return this.clothesService.update(+idCl, updateClotheDto);
  }

  @Delete(':idCl')
  remove(@Param('idCl') idCl: number): Promise<void> {
    return this.clothesService.remove(idCl);
  }
}
