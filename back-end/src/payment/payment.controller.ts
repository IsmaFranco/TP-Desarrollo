import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { User } from 'src/users/entities/user.entity';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { Rol } from 'src/common/enums/rol.enum';

@Controller('payment')
export class PaymentController {

    constructor(private readonly paymentService: PaymentService) { }

    @Auth(Rol.USER)
    @Post()
    async createPayment(@Body() data: { items: any[], user: User }) {
        return this.paymentService.createPayment(data.items, data.user);
    }
}
