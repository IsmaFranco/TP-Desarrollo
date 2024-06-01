import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
/* import { PurchaseModule } from './modules/purchase/purchase.module'; */
import { PurchasesModule } from './purchases/purchases.module';
import { PriceHistoryModule } from './price-history/price-history.module';
import { ClothesModule } from './clothes/clothes.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { LocationModule } from './location/location.module';
import { ProvincesModule } from './provinces/provinces.module';
import { LocationsModule } from './locations/locations.module';
import { LocalitiesModule } from './localities/localities.module';

@Module({
  imports: [PurchasesModule, PriceHistoryModule, ClothesModule, ShipmentsModule, LocationModule, ProvincesModule, LocationsModule, LocalitiesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
