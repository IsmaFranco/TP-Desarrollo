import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.scss',
})
export class NewItemComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      nameCl: ['', [Validators.required, Validators.maxLength(70)]],
      description: ['', [Validators.required, Validators.maxLength(250)]],
      size: ['', [Validators.required, Validators.maxLength(3)]],
      typeCl: ['', [Validators.required, Validators.maxLength(200)]],
      stock: ['', [Validators.required]],
      price: ['', [Validators.required]],
      image: ['', [Validators.required, Validators.maxLength(700)]],
    });
  }

  onSubmit() {
    const { nameCl, description, size, typeCl, stock, price, image } =
      this.loginForm.value;
    if (this.loginForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill out all fields correctly.',
      });
      return;
        }
    this.authService
      .newItem(nameCl, description, size, typeCl, stock, price, image)
      .subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Item created successfully',
            timer: 2000,
            showConfirmButton: false,
          });
          this.router.navigate(['/']);
        }
      );
  }

  hasError(field: string, typeError: string) {
    return (
      this.loginForm.get(field)?.hasError(typeError) &&
      this.loginForm.get(field)?.touched
    );
  }
}
