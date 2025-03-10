import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { User } from '../../models/clothes.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-purchases',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-purchases.component.html',
  styleUrl: './user-purchases.component.scss',
})
export class UserPurchasesComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  purchases: any[] = [];
  isLoading = true;
  user!: User;
  products: any[] = [];
  isDropdownOpen = false;

  ngOnInit(): void {
    this.loadUserPurchases();
  }

  private async loadUserPurchases(): Promise<void> {
    try {
      const user = await firstValueFrom(this.tokenService.getCurrentUser());
      this.user = user as User;

      if (!this.user || !this.user.idUs) {
        ///esto lo puse porque me daba unos errores en consola de que el usuario no estaba definido, pero porque tarda un pequeño tiempo en cargarlo
        return;
      }

      const purchaseData = await firstValueFrom(
        this.authService.getUserPurchases(this.user.idUs)
      );

      this.products = [];

      for (const purchase of purchaseData) {
        const purchaseProducts = await firstValueFrom(
          this.authService.getClotheByPurchaseId(purchase.idPu)
        );

        const purchaseWithProducts = {
          ...purchase,
          products: Array.isArray(purchaseProducts)
            ? purchaseProducts
            : [purchaseProducts],
        };

        this.purchases.push(purchaseWithProducts);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  sortPurchases(criterio: string, direction: string): void {
    if (!this.purchases || this.purchases.length === 0) return;

    this.purchases.sort((a, b) => {
      let comparison = 0;

      if (criterio === 'date') {
        const dateA = new Date(a.datePu).getTime();
        const dateB = new Date(b.datePu).getTime();
        comparison = dateA - dateB;
      } else if (criterio === 'amount') {
        comparison = a.amount - b.amount;
      }

      return direction === 'desc' ? -comparison : comparison;
    });
  }
}
