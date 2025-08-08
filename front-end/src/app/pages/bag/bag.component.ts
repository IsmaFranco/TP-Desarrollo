import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BagService } from '../../services/bag.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { User } from '../../models/clothes.model';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bag.component.html',
  styleUrl: './bag.component.scss',
})
export class BagComponent implements OnInit {
  bagItems: any[] = [];
  user: User | null = null;
  total: number = 0;
  userLocality: any | null = null;

  private subs: Subscription[] = [];

  constructor(private bagService: BagService, private router: Router, private tokenService: TokenService, private cdRef: ChangeDetectorRef, private authService: AuthService) {}

    ngOnInit(): void {
    const userSub = this.tokenService.currentUser$.subscribe(user => {
      this.user = user?.user || null;
      this.cdRef.markForCheck();
    });
    this.subs.push(userSub);
    
    this.tokenService.checkAuthStatus();

    this.bagItems = this.bagService.getBagItems();
  }

  removeProduct(productId: number) {
    this.bagService.removeFromBag(productId);
  }

  calculateTotalPrice() {
    return this.bagItems.reduce(
      (total, item) => total + item.price * item.quantity,
      this.user?.locality.cost
    );
  }

  hasItemsInBag() {
    return this.bagItems.length > 0;
  }

  navigate(){
    this.router.navigate(['/pay']);
  }
}
