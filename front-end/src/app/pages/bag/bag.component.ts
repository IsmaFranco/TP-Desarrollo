import { Component, OnInit } from '@angular/core';
import { BagService } from '../../services/bag.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bag.component.html',
  styleUrl: './bag.component.scss'
})
export class BagComponent implements OnInit {
    bagItems: any[] = [];

    constructor(private bagService: BagService, private router: Router) {}
  
    ngOnInit() {
      this.bagItems = this.bagService.getBagItems();
    }
  
    removeProduct(productId: number) {
      this.bagService.removeFromBag(productId);
    }
  
    calculateTotalPrice() {
      return this.bagItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    hasItemsInBag() {
      return this.bagItems.length > 0;
    }

    navegate(direc: string): void {
      this.router.navigate([direc]);
    }

}
