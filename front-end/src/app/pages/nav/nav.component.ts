import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet, Routes, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LOCAL_STORAGE } from '../../services/local-storage.provider.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent implements OnInit {
  userRole: string | null = null;

  constructor(private authService: AuthService, private router: Router,@Inject(LOCAL_STORAGE) private localStorage: Storage | null) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRoleFromToken();
  }

  menuOption: string = '';
  onOption(menuOption: string){
    this.menuOption = menuOption;
  }

  isAuthenticated(): boolean {
    if (this.localStorage) { // Verifica si `localStorage` está disponible
      const token = this.localStorage.getItem('token');
      return token !== null;
    }
    return false; // Si `localStorage` es `null`, retorna `false`
  }

  logout() {
    if (this.localStorage) { // Verifica si `localStorage` está disponible
      this.localStorage.removeItem('token');} // Elimina el token del `localStorage
    // Redirige al usuario si es necesario
    this.router.navigate(['/login'], {replaceUrl: true});
    setTimeout(() => {
      window.location.reload();
    }, 10);
  }
}
