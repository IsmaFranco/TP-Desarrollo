import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

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
    // Verificar estado inicial al crear el servicio (con delay para SSR)
    setTimeout(() => {
      this.checkAuthStatus();
    }, 400);
  }

  /**
   * Verifica el estado de autenticación y actualiza los BehaviorSubjects
   */
  checkAuthStatus(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      const isAuth = token !== null && token !== '';
      
      console.log('Verificando estado de auth:', { token: !!token, isAuth }); // Debug
      
      this.isAuthenticatedSubject.next(isAuth);
      
      if (isAuth && token) {
        try {
          const decodedToken: any = jwtDecode(token);
          console.log('Token decodificado:', decodedToken); // Debug
          this.currentUserSubject.next(decodedToken);
        } catch (error) {
          console.error('Error decodificando token:', error);
          this.logout(); // Token inválido, hacer logout
        }
      } else {
        this.currentUserSubject.next(null);
      }
    } else {
      // En el servidor (SSR), el usuario no está autenticado
      this.isAuthenticatedSubject.next(false);
      this.currentUserSubject.next(null);
    }
  }

  /**
   * Método para llamar después de un login exitoso
   */
  login(token: string): void {
    console.log('TokenService: Guardando token...'); // Debug
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('token', token);
      this.checkAuthStatus(); // Actualizar estado inmediatamente
    }
  }

  /**
   * Método para hacer logout
   */
  logout(): void {
    console.log('TokenService: Haciendo logout...'); // Debug
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('token');
      this.isAuthenticatedSubject.next(false);
      this.currentUserSubject.next(null);
    }
  }

  /**
   * Obtener el rol del token actual
   */
  getRoleFromToken(): string | null {
    if (typeof window === 'undefined') return null;
    
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.user?.rol || null;
    } catch (error) {
      console.error('Error obteniendo rol del token:', error);
      return null;
    }
  }

  // Mantener métodos síncronos para compatibilidad (pero usar los reactivos cuando sea posible)
  isAutenticated(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('token');
      return token !== null && token !== '';
    }
    return false;
  }

  getCurrentUser(): any {
    if (typeof window === 'undefined') return null;
    
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      console.error('Error obteniendo usuario actual:', error);
      return null;
    }
  }

  /**
   * Obtener el token actual
   */
  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('token');
  }
}
