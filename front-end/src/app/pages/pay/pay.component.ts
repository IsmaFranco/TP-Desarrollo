import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BagService } from '../../services/bag.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/clothes.model';
import { Router } from '@angular/router';
import { ClothesService } from '../../services/clothes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.scss'
})
export class PayComponent implements OnInit {
  productsInBag: any[] = [];
  totalAmount: number = 0; 
  user!: User;

  constructor(private bagService: BagService, private authService: AuthService, private router: Router, private clothesService: ClothesService) {}

  ngOnInit(): void {
    this.productsInBag = this.bagService.getBagItems();
    this.calculateTotal();

    this.authService.getCurrentUser()?.subscribe(user => {
      this.user = user as User});
  }

  calculateTotal(): void {
    this.totalAmount = this.productsInBag.reduce((total, product) => total + product.price , 0) as number;
  }

  aceptarCompra() {
    const shipmentData = {
      dateSh: new Date(),
      postalCode: this.user.postalCode
    };

    this.authService.createShipment(shipmentData).subscribe(shipment => {
      const shipmentId = shipment; 

      const purchaseData = {
        amount: this.totalAmount, 
        shipment: shipmentId,
        clothes: this.productsInBag, 
        user: this.user, 
        postalCode: this.user.postalCode
      };

      this.authService.createPurchase(purchaseData).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Compra realizada',
          timer: 2000,
          showConfirmButton: false,
        });
        this.bagService.clearBag();
        for (let i = 0; i < this.productsInBag.length; i++) {
          this.clothesService.updateProductStock(this.productsInBag[i].idCl, this.productsInBag[i].stock - 1).subscribe(() => {
            console.log('Stock actualizado');
          });
        }
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/']);
        });
    });
  });
  }
}