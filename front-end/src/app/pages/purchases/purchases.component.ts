import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.scss',
})
export class PurchasesComponent {
  purchases: any[] = [];
  filteredPurchases: any[] = [];
  filterForm: FormGroup;
  hasFiltered = false;

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: [''],
    });
  }

  filterPurchases(): void {
    const { startDate, endDate } = this.filterForm.value;

    this.purchases = [];
    this.filteredPurchases = [];
    this.hasFiltered = true;

    if ((startDate && endDate === '') || (startDate === '' && endDate)) {
      //Si no se selecciona una fecha, se muestra un error
      Swal.fire('Error', 'Debe seleccionar ambas fechas', 'error');
      return;
    }

    if (endDate < startDate) {
      Swal.fire(
        'Error',
        'La fecha de inicio debe ser menor a la fecha de fin',
        'error'
      );
      return;
    }

    if (startDate && endDate) {
      //muestra las compras entre las fechas seleccionadas
      this.authService
        .getPurchasesByDate(startDate, endDate)
        .subscribe(async (data) => {
          this.filteredPurchases = data;
          for (const purchase of this.filteredPurchases) {
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
        });
    }

    if (startDate === '' && endDate === '') {
      //si no hay fechas, se muestra todo
      this.authService.getPurchases().subscribe(async (data) => {
        this.filteredPurchases = data;
        for (const purchase of this.filteredPurchases) {
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
      });
    }
  }
}
