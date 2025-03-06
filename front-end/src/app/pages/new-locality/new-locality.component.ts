import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-locality',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-locality.component.html',
  styleUrl: './new-locality.component.scss'
})
export class NewLocalityComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      nameLo: ['', [Validators.required, Validators.maxLength(70)]],
      postalCode: ['', [Validators.required, Validators.maxLength(8)]],
      cost: ['', [Validators.required, Validators.maxLength(4)]]
    });
  }

    onSubmit() {
      const { nameLo, postalCode, cost } =
        this.loginForm.value;
      this.authService
        .newLocality(nameLo, postalCode, cost)
        .subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: 'Localidad creada correctamente',
              timer: 2000,
              showConfirmButton: false,
            });
            this.router.navigate(['/']);
          },
          (error: any) => {
            console.log('Error al crear el item:', error);
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
