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
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';

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
  findOne(@Param('idPu') idPu: number, @ActiveUser() users: UserActiveInterface): Promise<Purchase> {
      return this.purchasesService.findOne(idPu, users);
    }

  @Patch(':idPu')
  update(@Param('idPu') idPu: number, @Body() updatePurchaseDto: UpdatePurchaseDto, @ActiveUser() users: UserActiveInterface,
  ): Promise<Purchase> {
    return this.purchasesService.update(idPu, updatePurchaseDto, users);
  }

  @Delete(':idPu')
  remove(@Param('idPu') idPu: number, @Body('users') users: UserActiveInterface): Promise<void> {
    return this.purchasesService.remove(idPu, users);
  }

  @Get(':idPu/clothes')
  findOneCloth(@Param('idPu') idPu: number): Promise<Purchase> {
    return this.purchasesService.findOneCloth(+idPu);
  }
}
