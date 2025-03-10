// shipment.scheduler.ts
import * as cron from 'node-cron';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { STATUS } from './entities/shipment.entity';

@Injectable()
export class ShipmentsScheduler implements OnModuleInit {
    constructor(private readonly shipmentService: ShipmentsService) { }

    onModuleInit() {
        // se ejecuta cada minuto
        cron.schedule('* * * * *', async () => {
            try{
            console.log('Ejecutando verificación de estados de envíos: ' + new Date().toLocaleTimeString(), '\n');

            // actualiza envíos que tienen mas de 2 minuto y están en estado "pendiente"
            await this.shipmentService.updateShipmentsStatus(STATUS.PENDING, STATUS.SENT, 2);

            // actualiza envios que tienen mas de 4 minutos y estan en estado "enviado"
            await this.shipmentService.updateShipmentsStatus(STATUS.SENT, STATUS.DELIVERED, 4);
            } catch (error) {
                console.log('Error en el cron', error);
                }
            });
        }
}
