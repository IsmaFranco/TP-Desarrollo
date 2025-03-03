import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import axios from 'axios';
import { ShipmentsService } from '../shipments/shipments.service';
import { PurchasesService } from '../purchases/purchases.service';
import { ClothesService } from '../clothes/clothes.service';
import { PurchaseClotheService } from 'src/purchase-clothe/purchase-clothe.service';

@Controller('webhook')
export class WebhookController {
    constructor(
        private readonly shipmentService: ShipmentsService,
        private readonly purchaseService: PurchasesService,
        private readonly clothesService: ClothesService,
        private readonly purchaseClotheService: PurchaseClotheService,
    ) { }

    @Post('mercadopago')
    async handleWebhook(@Req() req: Request, @Res() res: Response) {
        const payment = req.body;

        console.log('Webhook recibido:', payment);

        if (payment.type === 'payment') {
            const paymentId = payment.data.id;

            try {
                const { data } = await axios.get(
                    `https://api.mercadopago.com/v1/payments/${paymentId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
                        },
                    },
                );

                console.log(`Estado del pago ${paymentId}:`, data.status);
                console.log('Metadata:', data.metadata);

                if (data.status === 'approved') {
                    const { total_amount, user, products } = data.metadata;

                    const shipmentData = {
                        dateSh: new Date(),
                        postalCode: user.postal_code,
                    };

                    const shipment = await this.shipmentService.create(shipmentData);

                    const purchaseData = {
                        amount: total_amount,
                        shipment: shipment.idSh,
                        user: user.id,
                        postalCode: user.postal_code,
                        paymentId: paymentId,
                    };

                    const purchase = await this.purchaseService.create(purchaseData);

                    for (const product of products) {
                        const clotheEntity = await this.clothesService.findOne(
                            product.id_cl,
                        );

                        const purchaseItem = {
                            purchase: purchase,
                            clothe: clotheEntity,
                            quantity: product.quantity,
                            unitPrice: product.price,
                        };

                        await this.purchaseClotheService.create(purchaseItem);
                    }

                    products.map(async (product: any) => {
                        await this.clothesService.decreaseStock(
                            product.id_cl,
                            product.quantity,
                        );
                    });
                }

                res.status(200).send('Webhook recibido correctamente');
            } catch (error) {
                console.error('Error procesando el webhook:', error.message);
                res.status(500).send('Error interno del servidor');
            }
        }
    }
}
