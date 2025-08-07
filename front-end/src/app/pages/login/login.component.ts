import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
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
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(AuthService) private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(email, password).subscribe({next: (response) => {
      Swal.fire({
        icon: 'success',
        title: 'Sesion iniciada',
        timer: 1000,
        showConfirmButton: false,
      });
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/']);
      });
    }, error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: 'Datos incorrectos, intente nuevamente',
      });
    }
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
