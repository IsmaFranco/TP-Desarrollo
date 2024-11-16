import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.scss'
})
export class PurchasesComponent implements OnInit {
  purchases: any[] = []; // Almacena todas las compras
  filteredPurchases: any[] = []; // Almacena las compras filtradas
  filterForm: FormGroup; // Formulario de filtro

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      startDate: [''], // Fecha inicial
      endDate: [''], // Fecha final
    });
  }

  ngOnInit(): void {
    this.authService.getPurchases().subscribe((data) => {
      this.purchases = data;
      this.filteredPurchases = data; // Inicialmente, muestra todas las compras
      console.log('Compras:', this.purchases);
    });
  }

  filterPurchases(): void {
    const { startDate, endDate } = this.filterForm.value;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const formattedStart = this.formatDate(start);
      const formattedEnd = this.formatDate(end);
      console.log('Filtrando compras entre', formattedStart, 'y', formattedEnd);

      this.filteredPurchases = this.purchases.filter((purchase) => {
        const purchaseDate = new Date(purchase.datePu);
        const formattedPurchaseDate = this.formatDate(purchaseDate);
        return formattedPurchaseDate >= formattedStart && formattedPurchaseDate <= formattedEnd;
      });
    } else {
      this.filteredPurchases = this.purchases; // Sin filtro si no hay fechas
    }
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // Extrae solo la parte de la fecha
  }

}
