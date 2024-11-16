import { Component } from '@angular/core';
import { inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cloth } from '../../models/clothes.model';
import { ClothesService } from '../../services/clothes.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  products: Cloth[] = []; // Lista original de productos
  filteredProducts: Cloth[] = [];
  selectedCategory: string = '';

  private clothesService = inject(ClothesService);
  private router = inject(Router); 

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.clothesService.getProducts().subscribe((data: any[]) => {
      this.products = data;
      this.filteredProducts = data; // Inicialmente muestra todos los productos
    });
  }

  navegate(id: number): void {
    this.router.navigate(['/products/', id]);
  }

  filterByCategory(category: string){
    if (this.selectedCategory === category) {
      this.selectedCategory = '';
      this.filteredProducts = this.products; // Muestra todos los productos
    } else {
      this.selectedCategory = category;
      this.filteredProducts = this.products.filter(product => product.typeCl=== category);
    
    }
  }

  isCategorySelected(category: string): boolean {
    return this.selectedCategory === category;
  }
}
