import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PaymentService {

  constructor(private readonly configService: ConfigService) { }

  async createPayment(items: any[], user: User) {
    try {
      const mercadopago = new MercadoPagoConfig({
        accessToken: this.configService.get('MP_ACCESS_TOKEN'),
      });
      const preference = await new Preference(mercadopago).create({
        body: {
          items: [...items.map(item => ({
            id: item.idCl,
            title: item.nameCl,
            quantity: item.quantity,
            currency_id: 'ARS',
            unit_price: item.price,
          })),
          {
            id: 'shipping',
            title: `Envío a ${user.locality.nameLo}`,
            quantity: 1,
            currency_id: 'ARS',
            unit_price: user.locality.cost,
          }],
          back_urls: {
            success: this.configService.get('back_url_success'),
            failure: this.configService.get('back_url_failure'),
            pending: this.configService.get('back_url_pending'),
          },
          auto_return: 'approved',
          notification_url: this.configService.get('notification_url'),
          metadata: {
            user: {
              id: user.idUs,
              idLo: user.locality.idLo,
              cost: user.locality.cost,
            },
            products: items.map(item => ({
              idCl: item.idCl,
              name: item.nameCl,
              price: item.price,
              quantity: item.quantity
            })),
            totalAmount: items.reduce((total, item) => total + (item.price * item.quantity), user.locality.cost)
          }
        }
      });

      console.log('Preferencia creada:', preference);
      return { init_point: preference.init_point };
    } catch (error) {
      console.error('Error al crear el pago:', error.message || error);
      throw new InternalServerErrorException(`Error al crear el pago: ${error.message}`);
    }
  }
}
