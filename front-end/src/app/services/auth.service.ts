import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_CONFIG } from '../../environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlLogin = API_CONFIG.URL_LOGIN;
  private urlRegister = API_CONFIG.URL_REGISTER;
  private urlClothes = API_CONFIG.URL_CLOTHES;
  private urlShipments = API_CONFIG.URL_SHIPMENTS;
  private urlPurchases = API_CONFIG.URL_PURCHASES;
  private urlPurchaseClothes = API_CONFIG.URL_PURCHASE_CLOTHES;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<{ token: string }>(this.urlLogin, {
        emailUs: email,
        passwordUs: password,
      })
      .pipe(
        tap((response: { token: string }) => {
          localStorage.setItem('token', response.token);
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
    postalCode: string
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
        postalCode: Number(postalCode),
      })
      .pipe(
        tap((response: any) => {
          console.log('Registro exitoso:', response);
        })
      );
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
}
