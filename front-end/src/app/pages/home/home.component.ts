import { Component } from '@angular/core';
import { inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cloth } from '../../models/clothes.model';
import { ClothesService } from '../../services/clothes.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { TokenService } from '../../services/token.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products: Cloth[] = [];
  filteredProducts: Cloth[] = [];
  selectedCategory: string = '';
  userRole: string | null = null;
  searchDesc: string = '';

  private clothesService = inject(ClothesService);
  private router = inject(Router);
  private tokenService = inject(TokenService);
  private cdRef = inject(ChangeDetectorRef);
  private route = inject(ActivatedRoute)

  private subs: Subscription[] = [];

  ngOnInit(): void {
    // 1) me suscribo al currentUser$ para detectar cambios
    const userSub = this.tokenService.currentUser$.subscribe(user => {
      this.userRole = user?.user.rol || null;
      this.cdRef.markForCheck();
      this.loadProducts();
    });
    this.subs.push(userSub);

    // 2) cargará de localStorage si ya había token
    this.tokenService.checkAuthStatus();

    this.route.paramMap.subscribe(params => {
      this.searchDesc = params.get('desc') || '';
      this.loadProducts();
    });
  }

  loadProducts(): void {
    if (this.searchDesc) {
      this.clothesService.searchProducts(this.searchDesc).subscribe(products => {
        this.products = products;
        this.filteredProducts = products;
      });
    } else {
      this.clothesService.getProducts().subscribe(products => {
        this.products = products;
        this.filteredProducts = products;
      });
    }
  }

  navegate(route: string, id: number): void {
    this.router.navigate([route, id]);
  }

  filterByCategory(category: string) {
    //Inicialmente se muestran todos los prod, al elegir un tipo de prenda se filtran los productos desde el back
    if (this.selectedCategory === category) {
      this.selectedCategory = '';
      this.filteredProducts = this.products;
    } else {
      this.selectedCategory = category;
      this.clothesService
        .getProductsByType(category)
        .subscribe((data: Cloth[]) => {
          this.filteredProducts = data;
        });
    }
  }

  isCategorySelected(category: string): boolean {
    return this.selectedCategory === category;
  }

  confirmAction(id: number): void {
    Swal.fire({
      title: '¿Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete product',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clothesService.deleteProduct(id).subscribe(() => {
          this.loadProducts();
        });
        Swal.fire('¡Done!', 'Product has been deleted.', 'success');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Product was not deleted', 'error');
      }
    });
  }
}
