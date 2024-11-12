import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl1 = 'http://localhost:3000/auth/login';
  private apiUrl2 = 'http://localhost:3000/auth/register';
  private apiUrl3 = 'http://localhost:3000/clothes';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<{token: string}>(this.apiUrl1, { emailUs: email, passwordUs: password })
    .pipe(
      tap((response: { token: string }) => {
        localStorage.setItem('token', response.token); // Guarda el token en el local storage
        console.log('Token recibido:', response.token); // Verifica si se recibe el token
      })
    );
  }

  register(nameUs: string, lastNameUs: string, emailUs: string, passwordUs: string, dni: string, phoneUs: string, addressUs: string, postalCode: string): Observable<any> {
    return this.http.post(this.apiUrl2, { nameUs, lastNameUs, emailUs, passwordUs, dni: Number(dni), phoneUs, addressUs, postalCode: Number(postalCode) })
    .pipe(
      tap((response: any) => {
        console.log('Registro exitoso:', response);
      })
    );
  }

  getRoleFromToken(): string | null {
    if (typeof window === 'undefined' || !localStorage.getItem('token')) {
      return null;
    }
    const token = localStorage.getItem('token');
    if (!token) return null;
  
    const decodedToken: any = jwtDecode(token);
    return decodedToken.rol; // Devuelve el rol del token
  }

  getCurrentUser(): any {
    if (typeof window === 'undefined' || !localStorage.getItem('token')) {
      return null;
    }
    const token = localStorage.getItem('token');
    if (!token) return null;
  
    const decodedToken: any = jwtDecode(token);
    return decodedToken.idUs; // Devuelve los datos del usuario
  }

  newItem(nameCl: string, description: string, size: string, typeCl: string, stock: number, price: number, image: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
    });
    
    return this.http.post(this.apiUrl3, 
        { nameCl, description, size, typeCl, stock, price, image },
        { headers }
    )
  }

}
