import { Component } from '@angular/core';
import { inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cloth } from '../../models/clothes.model';
import { ClothesService } from '../../services/clothes.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  products: Cloth[] = []; 
  filteredProducts: Cloth[] = [];
  selectedCategory: string = '';
  userRole: string | null = null;

  private clothesService = inject(ClothesService);
  private router = inject(Router); 
  private tokenService = inject(TokenService);
  private cdRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.userRole = this.tokenService.getRoleFromToken();
    this.cdRef.detectChanges();
    this.loadProducts();
  }

  loadProducts() {
    this.clothesService.getProducts().subscribe((data: any[]) => {
      this.products = data;
      this.filteredProducts = data; 
    });
  }

  navegate(route: string, id: number): void {
    this.router.navigate([route, id]);
  }

  filterByCategory(category: string){ //Inicialmente se muestran todos los prod, al elegir un tipo de prenda se filtran los productos desde el back
    if (this.selectedCategory === category) {
      this.selectedCategory = '';
      this.filteredProducts = this.products;
    } else {
      this.selectedCategory = category;
      this.clothesService.getProductsByType(category).subscribe((data: Cloth[]) => {
        this.filteredProducts = data;
      });
    
    }
  }

  isCategorySelected(category: string): boolean {
    return this.selectedCategory === category;
  }

  confirmAction(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar producto',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clothesService.deleteProduct(id).subscribe(() => {
          this.loadProducts();
        });       
        Swal.fire('¡Hecho!', 'Se eliminó el producto.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'No se eliminó el producto', 'error');
      }
    });

  }
}
