import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchases',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './purchases.component.html',
  styleUrl: './purchases.component.scss'
})
export class PurchasesComponent {
  purchases: any[] = []; 
  filteredPurchases: any[] = []; 
  filterForm: FormGroup; 

  constructor(private authService: AuthService, private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      startDate: [''], 
      endDate: [''], 
    });
  }

  filterPurchases(): void {
    const { startDate, endDate } = this.filterForm.value;

    if((startDate && endDate === '') || (startDate === '' && endDate)) {    //Si no se selecciona una fecha, se muestra un error
      Swal.fire('Error', 'Debe seleccionar ambas fechas', 'error');
      return;
    }

    if (endDate < startDate) {
      Swal.fire('Error', 'La fecha de inicio debe ser menor a la fecha de fin', 'error');
      return;
    }

    if (startDate && endDate) {   //muestra las compras entre las fechas seleccionadas
      this.authService.getPurchasesByDate(startDate, endDate).subscribe((data) => {
        this.filteredPurchases = data;
    });}

    if (startDate === '' && endDate === '') {   //si no hay fechas, se muestra todo
      this.authService.getPurchases().subscribe((data) => {
        this.filteredPurchases = data; 
      });
    }
  }

  
}
