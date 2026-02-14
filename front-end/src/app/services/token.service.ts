import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  // BehaviorSubject para manejar el estado de autenticación de forma reactiva
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private currentUserSubject = new BehaviorSubject<any>(null);

  // Observables públicos que los componentes pueden suscribirse
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Verificar estado inicial al crear el servicio (con delay por el servidor)
    setTimeout(() => {
      this.checkAuthStatus();
    }, 400);
  }

  checkAuthStatus(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      const isAuth = token !== null && token !== '';

      this.isAuthenticatedSubject.next(isAuth);

      if (isAuth && token) {
        try {
          const decodedToken: any = jwtDecode(token);
          this.currentUserSubject.next(decodedToken);
        } catch (error) {
          console.error('Error decoding token:', error);
          this.logout();
        }
      } else {
        this.currentUserSubject.next(null);
      }
    }
  }

  login(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', token);
      this.checkAuthStatus();
    }
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
      this.isAuthenticatedSubject.next(false);
      this.currentUserSubject.next(null);
    }
  }

  updateToken(newToken: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', newToken);
      this.checkAuthStatus();
    }
  }
}
