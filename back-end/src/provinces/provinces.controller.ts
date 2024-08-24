import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProvincesService } from './provinces.service';
import { CreateProvinceDto } from './dto/create-province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';
import { Province } from './entities/province.entity';

@Controller('provinces')
export class ProvincesController {
  constructor(private readonly provincesService: ProvincesService) {}

  @Post()
  create(@Body() createProvinceDto: CreateProvinceDto): Promise<Province> {
    return this.provincesService.create(createProvinceDto);
  }

  @Get()
  findAll(): Promise<Province[]> {
    return this.provincesService.findAll();
  }

  @Get(':idPr')
  findOne(@Param('idPr') idPr: number): Promise<Province> {
    return this.provincesService.findOne(+idPr);
  }

  @Patch(':idPr')
  update(
    @Param('idPr') idPr: number,
    @Body() updateProvinceDto: UpdateProvinceDto,
  ): Promise<Province> {
    return this.provincesService.update(+idPr, updateProvinceDto);
  }

  @Delete(':idPr')
  remove(@Param('idPr') idPr: number): Promise<void> {
    return this.provincesService.remove(+idPr);
  }
}
