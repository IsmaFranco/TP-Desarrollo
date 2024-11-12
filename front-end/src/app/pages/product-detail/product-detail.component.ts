import { Component, inject, Input, OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClothesService } from '../../services/clothes.service';
import { Cloth } from '../../models/clothes.model';
import { BagService } from '../../services/bag.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  userRole: string | null = null;
  private authService = inject(AuthService);

  loading:boolean = true;
  public cloth?: Cloth;
  @Input() product: any;

  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _clothesService = inject(ClothesService);
  private _bagService = inject(BagService);

  ngOnInit(): void {
    this.userRole = this.authService.getRoleFromToken();
    this._route.params.subscribe(params => {
      this._clothesService.getProductById(params['id']).subscribe((data: Cloth) => {
        console.log(data);
        this.cloth = data;
        this.loading = false;
      });
    });
  }

  addToBag(product: any) {
    this._bagService.addToBag(product);
  }

  navegate(direc: string, id: number | undefined): void {
    this._router.navigate([direc, id]);
  }
}
