import { Controller, Get, Param } from '@nestjs/common';
import { PurchaseClotheService } from './purchase-clothe.service';
import { PurchaseClothe } from './entities/purchase-clothe.entity';

@Controller('purchase-clothe')
export class PurchaseClotheController {
    constructor(private readonly purchaseClotheService: PurchaseClotheService) { }

    @Get()
    findAll(): Promise<PurchaseClothe[]> {
        return this.purchaseClotheService.findAll();
    }

    @Get(':purchaseId')
    findByPurchaseId(@Param('purchaseId') purchaseId: number): Promise<PurchaseClothe[]> {
        return this.purchaseClotheService.findByPurchaseId(purchaseId);
    }
}
