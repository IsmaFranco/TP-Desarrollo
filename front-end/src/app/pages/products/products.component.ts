import { Component, inject, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import { Router } from '@angular/router';
import { Cloth } from '../../models/clothes.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  products= [];
  productList: Cloth[] = [];

  private _router = inject(Router);
  private _http = inject(HttpClient);


  ngOnInit(): void {
    this._http.get<Cloth[]>('http://localhost:3000/clothes').subscribe((data: Cloth[]) => {
      console.log(data);
      this.productList = data;
    }
    );
  }

  navegate(id: number): void {
    this._router.navigate(['/products/', id]);
  }
}
