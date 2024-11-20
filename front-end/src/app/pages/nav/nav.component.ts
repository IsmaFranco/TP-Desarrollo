import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LOCAL_STORAGE } from '../../services/local-storage.provider.service';
import { BagService } from '../../services/bag.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  userRole: string | null = null;

  private _localStorage = inject(LOCAL_STORAGE);
  private _bagService = inject(BagService);
  private _router = inject(Router);
  private _authService = inject(AuthService);

  ngOnInit(): void {
    this.userRole = this._authService.getRoleFromToken();
  }

  menuOption: string = '';
  onOption(menuOption: string){
    this.menuOption = menuOption;
  }

  isAuthenticated(): boolean {
    if (this._localStorage) { // Verifica si `localStorage` está disponible
      const token = this._localStorage.getItem('token');
      return token !== null;
    }
    return false; // Si `localStorage` es `null`, retorna `false`
  }

  logout() {
    if (this._localStorage) { // Verifica si `localStorage` está disponible
      this._localStorage.removeItem('token');} // Elimina el token del `localStorage
    // Redirige al usuario si es necesario
    this._bagService.clearBag();  // Vacía el carrito al cerrar sesión
    this._router.navigate(['/login'], {replaceUrl: true});
    setTimeout(() => {
      window.location.reload();
    }, 10);
  }

}
