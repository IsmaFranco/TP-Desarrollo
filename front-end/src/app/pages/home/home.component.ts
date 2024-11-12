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

  productList: Cloth[] = [];

  private _clothesService = inject(ClothesService);
  private _router = inject(Router); 

  ngOnInit(): void {
    this._clothesService.getProducts().subscribe((data: Cloth[]) => {
      console.log(data);
      this.productList = data;
    });
  }

  navegate(id: number): void {
    this._router.navigate(['/products/', id]);
  }
}
