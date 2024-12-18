import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Rol } from 'src/common/enums/rol.enum';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    return this.purchasesService.create(createPurchaseDto);
  }

  @Get()
  findAllByUser(): Promise<Purchase[]> {
    return this.purchasesService.findAll();
  }

  @Get(':idPu')
  findOne(@Param('idPu') idPu: number): Promise<Purchase> {
      return this.purchasesService.findOne(idPu);
    }

  @Patch(':idPu')
  update(@Param('idPu') idPu: number, @Body() updatePurchaseDto: UpdatePurchaseDto): Promise<Purchase> {
    return this.purchasesService.update(idPu, updatePurchaseDto);
  }

  @Delete(':idPu')
  remove(@Param('idPu') idPu: number): Promise<void> {
    return this.purchasesService.remove(idPu);
  }

  @Get(':idPu/clothes')
  findOneCloth(@Param('idPu') idPu: number): Promise<Purchase> {
    return this.purchasesService.findOneCloth(idPu);
  }

  @Get('dates/:date1/:date2')
  findAllByDate(@Param('date1') date1: string, @Param('date2') date2: string): Promise<Purchase[]> {
    return this.purchasesService.findAllByDate(date1, date2);
  }
}
