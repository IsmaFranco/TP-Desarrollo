import { Component } from '@angular/core';
import { inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cloth } from '../../models/clothes.model';
import { ClothesService } from '../../services/clothes.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

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
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.userRole = this.authService.getRoleFromToken();
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

  filterByCategory(category: string){
    if (this.selectedCategory === category) {
      this.selectedCategory = '';
      this.filteredProducts = this.products;
    } else {
      this.selectedCategory = category;
      this.filteredProducts = this.products.filter(product => product.typeCl=== category);
    
    }
  }

  isCategorySelected(category: string): boolean {
    return this.selectedCategory === category;
  }
}
