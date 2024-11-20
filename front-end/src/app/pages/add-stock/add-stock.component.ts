import { Component, Input, OnInit } from '@angular/core';
import { Cloth } from '../../models/clothes.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClothesService } from '../../services/clothes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-stock',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-stock.component.html',
  styleUrl: './add-stock.component.scss'
})
export class AddStockComponent implements OnInit {

  @Input() cloth!: Cloth;
  editStockForm!: FormGroup;

  constructor(private fb: FormBuilder ,private clothesService: ClothesService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void{
  this.route.params.subscribe(params => {
    this.clothesService.getProductById(params['id']).subscribe((data: Cloth) => {
      console.log(data);
      this.cloth = data;
    });
  });
  this.editStockForm = this.fb.group({
    stock: ['', [Validators.required, Validators.min(0)]], 
  });
}

onSubmit() {
  if (this.editStockForm.valid) {
    const updatedStock = this.cloth.stock + this.editStockForm.value.stock;
    console.log(updatedStock);
    this.clothesService.updateProductStock(this.cloth.idCl, updatedStock).subscribe(
      () => alert('Stock actualizado exitosamente'),
      (error: any) => console.error('Error al actualizar el precio:', error)
    );
    this.router.navigate(['/']);
    setTimeout(() => {
      window.location.reload();
    }, 10);
  }
}
}

