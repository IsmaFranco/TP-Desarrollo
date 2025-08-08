import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BagService } from '../../services/bag.service';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit, OnDestroy {
  // Propiedades reactivas
  isAuthenticated = false;
  currentUser: any = null;
  userRole: string | null = null;
  
  private subscriptions: Subscription[] = [];
  
  // Servicios inyectados
  private _bagService = inject(BagService);
  private _router = inject(Router);
  private _tokenService = inject(TokenService);
  private _authService = inject(AuthService);

  ngOnInit(): void {
    // Suscribirse al estado de autenticación
    const authSub = this._tokenService.isAuthenticated$.subscribe(
      (isAuth) => {
        this.isAuthenticated = isAuth;
        console.log('Nav: Estado de autenticación:', isAuth); // Debug
      }
    );

    // Suscribirse al usuario actual
    const userSub = this._tokenService.currentUser$.subscribe(
      (user) => {
        this.currentUser = user;
        this.userRole = user?.rol || null;
        console.log('Nav: Usuario actual:', user); // Debug
      }
    );

    this.subscriptions.push(authSub, userSub);

    // Verificar estado inicial
    this._tokenService.checkAuthStatus();
  }

  ngOnDestroy(): void {
    // Limpiar suscripciones para evitar memory leaks
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  navigate(route: string): void {
    this._router.navigate([route]);
  }

  logout(): void {
    // Usar el AuthService para logout (que a su vez usa TokenService)
    this._authService.logout();
    this._bagService.clearBag();
    
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      timer: 1000,
      showConfirmButton: false,
    });
    
    this._router.navigate(['/login']);
  }

  // Getter para verificar si es admin
  get isAdmin(): boolean {
    return this.userRole === 'admin';
  }

  // Getter para obtener el nombre del usuario
  get userName(): string {
    return this.currentUser?.nameUs || 'Usuario';
  }

  // Métodos de compatibilidad (por si los usas en el template)
  isAuthenticatedSync(): boolean {
    return this.isAuthenticated;
  }
}