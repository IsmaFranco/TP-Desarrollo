import { Module } from '@nestjs/common';
import { WebhookController } from './webhook.controller';
import { ClothesModule } from 'src/clothes/clothes.module';
import { PurchasesModule } from 'src/purchases/purchases.module';
import { ShipmentsModule } from 'src/shipments/shipments.module';
import { PurchaseClotheModule } from 'src/purchase-clothe/purchase-clothe.module';

@Module({
    imports: [
        ShipmentsModule,
        PurchasesModule,
        ClothesModule,
        PurchaseClotheModule,
    ],
    controllers: [WebhookController],
})
export class WebhookModule { }
