import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BagService } from '../../services/bag.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/clothes.model';
import { TokenService } from '../../services/token.service';
import { PaymentService } from '../../services/payment.service';
import { firstValueFrom, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.scss',
})
export class PayComponent implements OnInit {
  bagItems: any[] = [];
  user!: User;

  private subs: Subscription[] = [];

  constructor(
    private bagService: BagService,
    private tokenService: TokenService,
    private paymentService: PaymentService,
    private cdRef: ChangeDetectorRef
  ) { }

  async ngOnInit() {
    this.bagItems = this.bagService.getBagItems();
    const userSub = this.tokenService.currentUser$.subscribe(user => {
      this.user = user?.user || null;
      this.cdRef.markForCheck();
    });
    this.subs.push(userSub);

    this.tokenService.checkAuthStatus();
  }

  calculateTotalPrice() {
    return this.bagItems.reduce(
      (total, item) => total + item.price * item.quantity,
      this.user.locality.cost
    );
  }

  aceptarCompra() {
    this.paymentService
      .createPayment(this.bagItems, this.user)
      .subscribe((response: { init_point: string }) => {
        window.location.href = response.init_point;
      });
  }
}
