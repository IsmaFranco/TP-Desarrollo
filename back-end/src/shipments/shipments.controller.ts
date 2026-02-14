import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';
import { Shipment } from './entities/shipment.entity';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Rol } from 'src/common/enums/rol.enum';

@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Auth(Rol.USER)
  @Post()
  create(@Body() createShipmentDto: CreateShipmentDto): Promise<Shipment> {
    return this.shipmentsService.create(createShipmentDto);
  }

  @Auth(Rol.ADMIN)
  @Get()
  findAll(): Promise<Shipment[]> {
    return this.shipmentsService.findAll();
  }

  @Auth(Rol.USER)
  @Get(':idSh')
  findOne(@Param('idSh') idSh: number): Promise<Shipment> {
    return this.shipmentsService.findOne(+idSh);
  }

  @Auth(Rol.ADMIN)
  @Patch(':idSh')
  update(
    @Param('idSh') idSh: number,
    @Body() updateShipmentDto: UpdateShipmentDto,
  ): Promise<Shipment> {
    return this.shipmentsService.update(+idSh, updateShipmentDto);
  }

  @Auth(Rol.ADMIN)
  @Delete(':idSh')
  remove(@Param('idSh') idSh: number): Promise<void> {
    return this.shipmentsService.remove(+idSh);
  }
}
