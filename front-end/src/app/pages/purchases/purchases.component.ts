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
  purchases: any[] = []; 
  filteredPurchases: any[] = []; 
  filterForm: FormGroup; 

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      startDate: [''], 
      endDate: [''], 
    });
  }

  ngOnInit(): void {
    this.authService.getPurchases().subscribe((data) => {
      this.purchases = data;
      this.filteredPurchases = data; 
    });
  }

  filterPurchases(): void {
    const { startDate, endDate } = this.filterForm.value;
    if (endDate < startDate) {
      alert('La fecha final debe ser mayor o igual a la fecha inicial');
      return;
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const formattedStart = this.formatDate(start);
      const formattedEnd = this.formatDate(end);

      this.filteredPurchases = this.purchases.filter((purchase) => {
        const purchaseDate = new Date(purchase.datePu);
        const formattedPurchaseDate = this.formatDate(purchaseDate);
        return formattedPurchaseDate >= formattedStart && formattedPurchaseDate <= formattedEnd;
      });
    } else {
      this.filteredPurchases = this.purchases; 
    }
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // extrae solo la parte de la fecha
  }

}
