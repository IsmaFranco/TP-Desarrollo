import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Purchase } from './entities/purchase.entity';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Rol } from 'src/common/enums/rol.enum';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) { }

  @Auth(Rol.USER)
  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    return this.purchasesService.create(createPurchaseDto);
  }

  @Auth(Rol.ADMIN)
  @Get()
  findAll(): Promise<Purchase[]> {
    return this.purchasesService.findAll();
  }

  @Auth(Rol.USER)
  @Get(':idPu')
  findOne(@Param('idPu') idPu: number): Promise<Purchase> {
    return this.purchasesService.findOne(idPu);
  }

  @Auth(Rol.ADMIN)
  @Patch(':idPu')
  update(@Param('idPu') idPu: number, @Body() updatePurchaseDto: UpdatePurchaseDto): Promise<Purchase> {
    return this.purchasesService.update(idPu, updatePurchaseDto);
  }

  @Auth(Rol.ADMIN)
  @Delete(':idPu')
  remove(@Param('idPu') idPu: number): Promise<void> {
    return this.purchasesService.remove(idPu);
  }

  @Auth(Rol.USER)
  @Get(':idPu/clothes')
  findOneCloth(@Param('idPu') idPu: number): Promise<Purchase> {
    return this.purchasesService.findOneCloth(idPu);
  }

  @Auth(Rol.ADMIN)
  @Get('dates/:date1/:date2')
  findAllByDate(@Param('date1') date1: string, @Param('date2') date2: string): Promise<Purchase[]> {
    return this.purchasesService.findAllByDate(date1, date2);
  }

  @Auth(Rol.USER)
  @Get('user/:idUs')
  findAllByUser(@Param('idUs') idUs: number): Promise<Purchase[]> {
    return this.purchasesService.findAllByUser(idUs);
  }

  @Auth(Rol.USER)
  @Get('payment/:paymentId')
  findOneByPayment(@Param('paymentId') paymentId: string): Promise<Purchase> {
    return this.purchasesService.findOneByPayment(paymentId);
  }
}
