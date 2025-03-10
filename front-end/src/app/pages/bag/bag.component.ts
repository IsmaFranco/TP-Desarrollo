import { Component, OnInit } from '@angular/core';
import { BagService } from '../../services/bag.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { User } from '../../models/clothes.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bag.component.html',
  styleUrl: './bag.component.scss',
})
export class BagComponent implements OnInit {
  bagItems: any[] = [];
  user!: User;

  constructor(private bagService: BagService, private router: Router, private tokenService: TokenService) {}

  ngOnInit() {
    this.bagItems = this.bagService.getBagItems();
    (this.tokenService.getCurrentUser() as Observable<User>).subscribe((user: User) => {
      this.user = user;
    });
  }

  removeProduct(productId: number) {
    this.bagService.removeFromBag(productId);
  }

  calculateTotalPrice() {
    return this.bagItems.reduce(
      (total, item) => total + item.price * item.quantity,
      this.user.locality.cost
    );
  }

  hasItemsInBag() {
    return this.bagItems.length > 0;
  }

  navigate(){
    this.router.navigate(['/pay']);
  }
}
