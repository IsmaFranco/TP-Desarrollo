import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_CONFIG } from '../../environments';
import { TokenService } from './token.service'; // Importar TokenService

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlLogin = API_CONFIG.API_URL + '/auth/login';
  private urlRegister = API_CONFIG.API_URL + '/auth/register';
  private urlClothes = API_CONFIG.API_URL + '/clothes';
  private urlShipments = API_CONFIG.API_URL + '/shipments';
  private urlPurchases = API_CONFIG.API_URL + '/purchases';
  private urlPurchaseClothes = API_CONFIG.API_URL + '/purchase-clothes';
  private urlLocalities = API_CONFIG.API_URL + '/localities';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService // Inyectar TokenService
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<{ token: string }>(this.urlLogin, {
        emailUs: email,
        passwordUs: password,
      })
      .pipe(
        tap((response: { token: string }) => {
          // CAMBIO IMPORTANTE: Usar el TokenService en lugar de localStorage directamente
          this.tokenService.login(response.token);
          console.log('Login exitoso, token guardado'); // Para debug
        })
      );
  }

  register(
    nameUs: string,
    lastNameUs: string,
    emailUs: string,
    passwordUs: string,
    dni: string,
    phoneUs: string,
    addressUs: string,
    idLo: number
  ): Observable<any> {
    return this.http
      .post(this.urlRegister, {
        nameUs,
        lastNameUs,
        emailUs,
        passwordUs,
        dni: Number(dni),
        phoneUs,
        addressUs,
        idLo: Number(idLo),
      })
      .pipe(
        tap((response: any) => {
          console.log('Registro exitoso:', response);
        })
      );
  }

  /**
   * Método para hacer logout
   */
  logout(): void {
    this.tokenService.logout();
  }

  newItem(
    nameCl: string,
    description: string,
    size: string,
    typeCl: string,
    stock: number,
    price: number,
    image: string
  ): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(
      this.urlClothes,
      { nameCl, description, size, typeCl, stock, price, image },
      { headers }
    );
  }

  createShipment(shipmentData: any): Observable<any> {
    return this.http.post<any>(this.urlShipments, shipmentData);
  }

  createPurchase(purchaseData: any) {
    return this.http.post(this.urlPurchases, purchaseData);
  }

  getPurchases(): Observable<any> {
    return this.http.get(this.urlPurchases);
  }

  getPurchasesByDate(startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${this.urlPurchases}/dates/${startDate}/${endDate}`);
  }

  getUserPurchases(userId: number): Observable<any> {
    return this.http.get(`${this.urlPurchases}/user/${userId}`);
  }

  getPurchaseByPaymentId(paymentId: string): Observable<any> {
    return this.http.get(`${this.urlPurchases}/payment/${paymentId}`);
  }

  getClotheByPurchaseId(purchaseId: number): Observable<any> {
    return this.http.get(`${this.urlPurchaseClothes}/${purchaseId}`);
  }

  getLocalities(): Observable<any> {
    return this.http.get(this.urlLocalities);
  }

  newLocality(nameLo: string, postalCode: number, cost: number): Observable<any> {
    return this.http.post(this.urlLocalities, { nameLo, postalCode, cost });
  }
}