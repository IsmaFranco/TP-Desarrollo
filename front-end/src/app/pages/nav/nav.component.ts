import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { BagService } from '../../services/bag.service';
import { ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  userRole: string | null = null;

  private _bagService = inject(BagService);
  private _router = inject(Router);
  private _tokenService = inject(TokenService);
  private _cdRef = inject(ChangeDetectorRef);


  ngDoCheck(): void {
    this.userRole = this._tokenService.getRoleFromToken();
    this._cdRef.detectChanges();
  }

  menuOption: string = '';
  onOption(menuOption: string){
    this.menuOption = menuOption;
  }

  isAuthenticated(): boolean {
    return this._tokenService.isAutenticated();
  }

  logout() {
    if (localStorage) { 
      localStorage.removeItem('token');} 
    this._bagService.clearBag();  
    Swal.fire({
      icon: 'success',
      title: 'Sesión cerrada',
      timer: 1000,
      showConfirmButton: false,
    });
    this._router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
      this._router.navigate(['/login']);
    });
  }

}
