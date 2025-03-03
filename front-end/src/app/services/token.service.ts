import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private http: HttpClient) {}

  getRoleFromToken(): string | null {
    if (typeof window === 'undefined' || !localStorage.getItem('token')) {
      return null;
    }
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decodedToken: any = jwtDecode(token);
    return decodedToken.rol;
  }

  isAutenticated(): boolean {
    if (typeof window !== 'undefined' && window.localStorage) {
      //la verificacion del window la puse porque si bien funcionaba igual, la consola me daba un error de que window no estaba definido
      const token = localStorage.getItem('token');
      return token !== null;
    }
    return false;
  }

  getCurrentUser() {
    if (typeof window === 'undefined' || !localStorage.getItem('token')) {
      return of(null);
    }

    const token = localStorage.getItem('token');
    if (!token) return of(null);

    try {
      const decodedToken = jwtDecode<{ idUs: number }>(token);
      return this.http.get(`http://localhost:3000/users/${decodedToken.idUs}`); // devuelve los datos del usuario
    } catch (error) {
      return of(null);
    }
  }
}
