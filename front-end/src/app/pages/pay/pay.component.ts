import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BagService } from '../../services/bag.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/clothes.model';
import { TokenService } from '../../services/token.service';
import { PaymentService } from '../../services/payment.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.scss',
})
export class PayComponent implements OnInit {
  productsInBag: any[] = [];
  totalAmount: number = 0;
  user!: User;

  constructor(
    private bagService: BagService,
    private tokenService: TokenService,
    private authService: AuthService,
    private paymentService: PaymentService
  ) {}

  async ngOnInit(): Promise<void> {
    this.productsInBag = this.bagService.getBagItems();
    this.calculateTotal();

    const currentUser = await firstValueFrom(
      this.tokenService.getCurrentUser()
    );
    if (currentUser) {
      this.user = currentUser as User;
    }
  }

  calculateTotal(): void {
    this.totalAmount = this.productsInBag.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    ) as number;
  }

  aceptarCompra() {
    this.paymentService
      .createPayment(this.productsInBag, this.user)
      .subscribe((response: { init_point: string }) => {
        window.location.href = response.init_point;
      });
  }
}
