import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PaymentService {

  constructor(private readonly configService: ConfigService) { }

  async createPayment(items: any[], user: User) {
    const mercadopago = new MercadoPagoConfig({
      accessToken: this.configService.get('MP_ACCESS_TOKEN'),
    });
    const preference = await new Preference(mercadopago).create({
      body: {
        items: items.map(item => ({
          id: item.idCl,
          title: item.nameCl,
          quantity: item.quantity,
          currency_id: 'ARS',
          unit_price: item.price,
        })),
        back_urls: {
          success: 'http://localhost:4200/success',
          failure: 'http://localhost:4200/bag',
        },
        auto_return: 'approved',
        metadata: {
          user: {
            id: user.idUs,
            postalCode: user.postalCode
          },
          products: items.map(item => ({
            idCl: item.idCl,
            name: item.nameCl,
            price: item.price,
            quantity: item.quantity
          })),
          totalAmount: items.reduce((total, item) => total + (item.price * item.quantity), 0)
        }
      }
    });


    try {
      return { init_point: preference.init_point };
    } catch (error) {
      throw new Error(`Error al crear el pago: ${error.message}`);
    }
  }
}