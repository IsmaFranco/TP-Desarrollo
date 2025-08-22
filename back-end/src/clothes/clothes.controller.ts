import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ClothesService } from './clothes.service';
import { CreateClotheDto } from './dto/create-clothe.dto';
import { UpdateClotheDto } from './dto/update-clothe.dto';
import { Clothe } from './entities/clothe.entity'; // Añadimos esta línea para importar la entidClad Clothes
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Rol } from 'src/common/enums/rol.enum';


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

  @Get('search')
  searchProducts(@Query('q') query: string) {
    return this.clothesService.searchByName(query);
  }

  @Get(':idCl')
  findOne(@Param('idCl') idCl: number): Promise<Clothe> {
    return this.clothesService.findOne(idCl);
  }

  @Get('type/:typeCl')
  findByCategory(@Param('typeCl') category: string): Promise<Clothe[]> {
    return this.clothesService.findByCategory(category);
  }

  @Auth(Rol.ADMIN)
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

  @Put(':idCl/new-price')
  async updateProductPrice(@Param('idCl') id: number, @Body('price') price: number) {
  return await this.clothesService.updateProductPrice(id, price);
  }

  @Put(':idCl/add-stock')
  async updateProductStock(@Param('idCl') id: number, @Body('stock') stock: number) {
  return await this.clothesService.updateProductStock(id, stock);
  }

  @Patch(':idCl/deactivate')
  async deactivateProduct(@Param('idCl') idCl: number) {
    return await this.clothesService.deactivateProduct(idCl);
  }

}
