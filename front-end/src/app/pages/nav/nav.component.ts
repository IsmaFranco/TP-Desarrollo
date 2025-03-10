import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BagService } from '../../services/bag.service';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  userRole: string | null = null;
  userName: string = '';

  private _bagService = inject(BagService);
  private _router = inject(Router);
  private _tokenService = inject(TokenService);
  private _cdRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.updateUserInfo();
  }

  ngDoCheck(): void {
    this.userRole = this._tokenService.getRoleFromToken();
    this._cdRef.detectChanges();
  }

  private updateUserInfo(): void {
    if (this.isAuthenticated()) {
      (this._tokenService.getCurrentUser() as any).subscribe((user: { nameUs: string; }) => {
        if (user && user.nameUs) {
          this.userName = user.nameUs;
        }
      });
    } else {
      this.userName = '';
    }
  }

  navigate(route: string) {
    this._router.navigate([route]);
  }

  isAuthenticated(): boolean {
    return this._tokenService.isAutenticated();
  }

  logout() {
    if (localStorage) {
      localStorage.removeItem('token');
    }
    this._bagService.clearBag();
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      timer: 1000,
      showConfirmButton: false,
    });
    this._router.navigate(['/login']);
  }
}
