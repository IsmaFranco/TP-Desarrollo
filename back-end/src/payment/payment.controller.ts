import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { User } from 'src/users/entities/user.entity';

@Controller('payment')
export class PaymentController {

    constructor(private readonly paymentService: PaymentService) { }

    @Post()
    async createPayment(@Body() data: { items: any[], user: User }) {
        return this.paymentService.createPayment(data.items, data.user);
    }
}
