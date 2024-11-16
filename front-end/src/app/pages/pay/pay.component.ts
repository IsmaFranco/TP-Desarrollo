import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BagService } from '../../services/bag.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/clothes.model';
import { Locality } from '../../models/localities.model';
import { Router } from '@angular/router';
import { ClothesService } from '../../services/clothes.service';

@Component({
  selector: 'app-pay',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pay.component.html',
  styleUrl: './pay.component.scss'
})
export class PayComponent implements OnInit {
  productsInBag: any[] = [];
  totalAmount: number = 0; // Total a pagar
  user!: User; // Usuario actual

  constructor(private bagService: BagService, private authService: AuthService, private router: Router, private clothesService: ClothesService) {}

  ngOnInit(): void {
    // Cargar productos del carrito
    this.productsInBag = this.bagService.getBagItems();
    this.calculateTotal();

    // Obtener datos del usuario
    this.authService.getCurrentUser()?.subscribe(user => {
      this.user = user as User});

  }

  calculateTotal(): void {
    this.totalAmount = this.productsInBag.reduce((total, product) => total + (product.price * product.quantity), 0) as number;
  }

  aceptarCompra() {
    // Datos del carrito y usuario
    const shipmentData = {
      dateSh: new Date(),
      postalCode: this.user.postalCode
    };

    // Crear Shipment primero
    this.authService.createShipment(shipmentData).subscribe(shipment => {
      const shipmentId = shipment; 

      const purchaseData = {
        amount: this.totalAmount, 
        shipment: shipmentId,
        clothes: this.productsInBag, 
        user: this.user, 
        postalCode: this.user.postalCode
      };

      this.authService.createPurchase(purchaseData).subscribe(purchase => {
        alert('Compra realizada con éxito');
        this.bagService.clearBag();
        this.router.navigate(['/']);
        for (let i = 0; i < this.productsInBag.length; i++) {
          this.clothesService.updateProductStock(this.productsInBag[i].idCl, this.productsInBag[i].stock - this.productsInBag[i].quantity).subscribe(() => {
            console.log('Stock actualizado');
          });
        }
      });
    });
  }

}