import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.scss'
})
export class NewItemComponent implements OnInit {

  loginForm!: FormGroup;
  menuOption: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      nameCl: ['', [Validators.required, Validators.maxLength(70)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      size: ['', [Validators.required, Validators.maxLength(3)]],
      typeCl: ['', [Validators.required, Validators.maxLength(200)]],
      stock: ['', [Validators.required]],
      price: ['', [Validators.required]],
      image: ['', [Validators.required, Validators.maxLength(200)]]
    });
  }

  onSubmit() {
    const { nameCl, description, size, typeCl, stock, price, image } = this.loginForm.value;
    this.authService.newItem(nameCl, description, size, typeCl, stock, price, image).subscribe(
      (response) => {
        console.log('Item creado:', response);
        this.router.navigate(['/']);
      },
      (error) => {
        console.log('Error al crear el item:', error);
      }
    );
  }
  
  ngOnInit(): void {
  }

  hasError(field: string, typeError: string){
    return this.loginForm.get(field)?.hasError(typeError) && this.loginForm.get(field)?.touched;
  }

}

