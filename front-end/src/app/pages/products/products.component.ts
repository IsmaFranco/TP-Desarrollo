import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {CommonModule} from '@angular/common';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  productList: Product[] = [];

  private _apiService = inject(ApiService);
  private _router = inject(Router); 

  ngOnInit(): void {
    this._apiService.getProducts().subscribe((data: Product[]) => {
      console.log(data);
      this.productList = data;
    });
  }

  navegate(id: number): void {
    this._router.navigate(['/products/', id]);
  }
}
