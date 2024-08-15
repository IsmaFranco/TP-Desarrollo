import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity'; // Añadimos esta línea para importar la entidad Admin

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto): Promise<Admin> {
    return this.adminsService.create(createAdminDto);
  }

  @Get()
  findAll(): Promise<Admin[]> {
    return this.adminsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Admin> {
    return this.adminsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    return this.adminsService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    // Cambiamos el tipo de retorno de Admin a void pq no se, pero no debería retornar nada
    return this.adminsService.remove(id);
  }
}
