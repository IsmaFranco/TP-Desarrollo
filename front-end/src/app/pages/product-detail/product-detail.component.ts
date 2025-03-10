import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ClothesService } from '../../services/clothes.service';
import { Cloth } from '../../models/clothes.model';
import { BagService } from '../../services/bag.service';
import { TokenService } from '../../services/token.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  userRole: string | null = null;
  loading = true;
  public cloth?: Cloth;
  @Input() product: any;
  quantity: number = 0;

  private tokenService = inject(TokenService);
  private route = inject(ActivatedRoute);
  private clothesService = inject(ClothesService);
  private bagService = inject(BagService);

  ngOnInit(): void {
    this.userRole = this.tokenService.getRoleFromToken();
    this.route.params.subscribe((params) => {
      this.clothesService
        .getProductById(params['id'])
        .subscribe((data: Cloth) => {
          this.cloth = data;
          this.loading = false;
        });
    });
  }

  addToBag(product: any) {
    const productToAdd = {
      ...product,
      quantity: this.quantity,
    };

    this.bagService.addToBag(productToAdd);
  }

  decreaseQuantity() {
    this.quantity = this.quantity == 0 ? 0 : this.quantity - 1;
  }

  increaseQuantity() {
    const itemInBag = this.bagService
      .getBagItems()
      .find((item) => item.idCl === this.cloth!.idCl);
    const quantityInBag = itemInBag ? itemInBag.quantity : 0;
    const maxAllowed = this.cloth!.stock - quantityInBag;
    this.quantity = this.quantity < maxAllowed ? this.quantity + 1 : maxAllowed;
  }
}
