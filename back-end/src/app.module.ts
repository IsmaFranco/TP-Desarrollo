import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PurchasesModule } from './purchases/purchases.module';
import { PriceHistoryModule } from './price-history/price-history.module';
import { ClothesModule } from './clothes/clothes.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { ProvincesModule } from './provinces/provinces.module';
import { LocalitiesModule } from './localities/localities.module';
import { UsersModule } from './users/users.module';
import { AdminsModule } from './admins/admins.module';
import { CustomersModule } from './customers/customers.module';
import { SuppliersModule } from './suppliers/suppliers.module';

Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PurchasesModule,
    PriceHistoryModule,
    ClothesModule,
    ShipmentsModule,
    ProvincesModule,
    LocalitiesModule,
    UsersModule,
    AdminsModule,
    CustomersModule,
    SuppliersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
});
export class AppModule {}
