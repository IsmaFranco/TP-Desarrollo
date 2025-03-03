import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  loginForm!: FormGroup;
  menuOption: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    @Inject(Router) private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      nameUs: ['', [Validators.required]],
      lastNameUs: ['', [Validators.required]],
      emailUs: ['', [Validators.required, Validators.email]],
      passwordUs: ['', [Validators.required, Validators.minLength(6)]],
      dni: ['', [Validators.required, Validators.minLength(8)]],
      phoneUs: ['', [Validators.required, Validators.minLength(9)]],
      addressUs: ['', [Validators.required]],
      postalCode: ['', Validators.required],
    });
  }

  onSubmit() {
    const {
      nameUs,
      lastNameUs,
      emailUs,
      passwordUs,
      dni,
      phoneUs,
      addressUs,
      postalCode,
    } = this.loginForm.value;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService
      .register(
        nameUs,
        lastNameUs,
        emailUs,
        passwordUs,
        dni,
        phoneUs,
        addressUs,
        postalCode
      )
      .subscribe((response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          timer: 2000,
          showConfirmButton: false,
        });
        this.router.navigate(['/login']);
      });
  }

  navigate(url: string) {
    this.router.navigate([url]);
  }

  hasError(field: string, typeError: string) {
    return (
      this.loginForm.get(field)?.hasError(typeError) &&
      this.loginForm.get(field)?.touched
    );
  }
}
