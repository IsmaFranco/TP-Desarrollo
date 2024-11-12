import { Component, OnInit } from '@angular/core';
import { BagService } from '../../services/bag.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bag.component.html',
  styleUrl: './bag.component.scss'
})
export class BagComponent implements OnInit {
    bagItems: any[] = [];

    constructor(private bagService: BagService) {}
  
    ngOnInit() {
      this.bagItems = this.bagService.getBagItems();
    }
  
    removeProduct(productId: number) {
      this.bagService.removeFromBag(productId);
    }
  
    calculateTotalPrice() {
      return this.bagItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
}
