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
import { Admin } from './entities/admin.entity'; // Añadimos esta línea para importar la entidUsad Admin

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

  @Get(':idUs')
  findOne(@Param('idUs') idUs: number): Promise<Admin> {
    return this.adminsService.findOne(+idUs);
  }

  @Patch(':idUs')
  update(
    @Param('idUs') idUs: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    return this.adminsService.update(+idUs, updateAdminDto);
  }

  @Delete(':idUs')
  remove(@Param('idUs') idUs: number): Promise<void> {
    // Cambiamos el tipo de retorno de Admin a voidUs pq no se, pero no debería retornar nada
    return this.adminsService.remove(+idUs);
  }
}
