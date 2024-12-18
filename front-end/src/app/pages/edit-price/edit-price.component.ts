import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit} from '@angular/core';
import { ClothesService } from '../../services/clothes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cloth } from '../../models/clothes.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-price',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-price.component.html',
  styleUrl: './edit-price.component.scss'
})
export class EditPriceComponent implements OnInit {

  @Input() cloth!: Cloth;
  editPriceForm!: FormGroup;
  loading = true;

  constructor(private fb: FormBuilder ,private clothesService: ClothesService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void{
  this.route.params.subscribe(params => {
    this.clothesService.getProductById(params['id']).subscribe((data: Cloth) => {
      this.cloth = data;
      this.loading = false;
    });
  });
  this.editPriceForm = this.fb.group({
    price: ['', [Validators.required, Validators.min(0)]],
  });
}

onSubmit() {
  if (this.editPriceForm.valid) {
    const updatedPrice = this.editPriceForm.value.price;
    this.clothesService.updateProductPrice(this.cloth.idCl, updatedPrice).subscribe(
      () => console.log('Precio actualizado exitosamente'),
      (error: any) => console.error('Error al actualizar el precio:', error)
    );
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  }
}
}
