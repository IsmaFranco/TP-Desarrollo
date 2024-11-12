import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PurchasesModule } from './purchases/purchases.module';
//import { PriceHistoryModule } from './price-history/price-history.module';
import { ClothesModule } from './clothes/clothes.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { ProvincesModule } from './provinces/provinces.module';
import { LocalitiesModule } from './localities/localities.module';
import { UsersModule } from './users/users.module';
//import { AdminsModule } from './admins/admins.module';
//import { CustomersModule } from './customers/customers.module';
//import { SuppliersModule } from './suppliers/suppliers.module';
import { Clothe } from './clothes/entities/clothe.entity';
import { Purchase } from './purchases/entities/purchase.entity';
//import { Supplier } from './suppliers/entities/supplier.entity';
import { Shipment } from './shipments/entities/shipment.entity';
import { User } from './users/entities/user.entity';
//import { Admin } from './admins/entities/admin.entity';
//import { Customer } from './customers/entities/customer.entity';
import { Province } from './provinces/entities/province.entity';
import { Locality } from './localities/entities/locality.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'tp-desarrollo',
      entities: [
        Clothe,
        Purchase,
        //Supplier,
        Shipment,
        User,
        //Admin,
        //Customer,
        Province,
        Locality,
      ],
      autoLoadEntities: true,
      synchronize: true,
    }),
    PurchasesModule,
    //PriceHistoryModule,
    ClothesModule,
    ShipmentsModule,
    ProvincesModule,
    LocalitiesModule,
    UsersModule,
    //AdminsModule,
    //CustomersModule,
    //SuppliersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
