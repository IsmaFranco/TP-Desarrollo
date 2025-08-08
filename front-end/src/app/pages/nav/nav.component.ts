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
    const authSub = this._tokenService.isAuthenticated$.subscribe(
      (isAuth) => {
        this.isAuthenticated = isAuth;
      }
    );

    const userSub = this._tokenService.currentUser$.subscribe(
      (user) => {
        this.currentUser = user?.user;
        this.userRole = user?.user.rol || null;
      }
    );

    this.subscriptions.push(authSub, userSub);

    this._tokenService.checkAuthStatus();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  navigate(route: string): void {
    this._router.navigate([route]);
  }

  logout(): void {
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

  get userName(): string {
    return this.currentUser?.nameUs || 'Usuario';
  }

}