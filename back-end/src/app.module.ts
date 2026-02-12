import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PurchasesModule } from './purchases/purchases.module';
import { ClothesModule } from './clothes/clothes.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { LocalitiesModule } from './localities/localities.module';
import { UsersModule } from './users/users.module';
import { Clothe } from './clothes/entities/clothe.entity';
import { Purchase } from './purchases/entities/purchase.entity';
import { Shipment } from './shipments/entities/shipment.entity';
import { User } from './users/entities/user.entity';
import { Locality } from './localities/entities/locality.entity';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { WebhookController } from './webhook/webhook.controller';
import { WebhookModule } from './webhook/webhook.module';
import { PurchaseClotheController } from './purchase-clothe/purchase-clothe.controller';
import { PurchaseClotheModule } from './purchase-clothe/purchase-clothe.module';
import { PurchaseClothe } from './purchase-clothe/entities/purchase-clothe.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<'mysql'>('DB_TYPE'),
        url: configService.get<string>('DB_URL'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [
          Clothe,
          Purchase,
          Shipment,
          User,
          Locality,
          PurchaseClothe,
        ],
      }),
      inject: [ConfigService],
    }),
    PurchasesModule,
    ClothesModule,
    ShipmentsModule,
    LocalitiesModule,
    UsersModule,
    AuthModule,
    PaymentModule,
    WebhookModule,
    PurchaseClotheModule,
  ],
  controllers: [AppController, WebhookController, PurchaseClotheController],
  providers: [AppService],
})
export class AppModule {}
