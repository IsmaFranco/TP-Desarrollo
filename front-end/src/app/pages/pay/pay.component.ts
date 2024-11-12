import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BagService } from '../../services/bag.service';
import { AuthService } from '../../services/auth.service';

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
  user: any = {}; // Usuario actual
  router: any;

  constructor(private bagService: BagService, private authService: AuthService) {}

  ngOnInit(): void {
    // Cargar productos del carrito
    this.productsInBag = this.bagService.getBagItems();
    this.calculateTotal();

    // Obtener datos del usuario
    this.user = this.authService.getCurrentUser();
  }

  calculateTotal(): void {
    this.totalAmount = this.productsInBag.reduce((total, product) => total + (product.price * product.quantity), 0);
  }

  confirmPayment(): void {
    // Llamar al servicio para procesar el pago
    console.log(this.productsInBag, this.user, this.totalAmount);
    this.bagService.processOrder(this.productsInBag, this.user, this.totalAmount).subscribe(
      (response: any) => {
        console.log('Pago exitoso:', response);
        this.bagService.clearBag();
        this.router.navigate(['/']);
      },
      (error: any) => {
        console.error('Error al procesar el pago:', error);
      }
    );
  }
}