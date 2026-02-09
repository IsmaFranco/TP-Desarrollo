import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { API_CONFIG } from '../../environments';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlLogin = API_CONFIG.API_URL + '/auth/login';
  private urlRegister = API_CONFIG.API_URL + '/auth/register';
  private urlClothes = API_CONFIG.API_URL + '/clothes';
  private urlShipments = API_CONFIG.API_URL + '/shipments';
  private urlPurchases = API_CONFIG.API_URL + '/purchases';
  private urlPurchaseClothes = API_CONFIG.API_URL + '/purchase-clothe';
  private urlLocalities = API_CONFIG.API_URL + '/localities';
  private urlUsers = API_CONFIG.API_URL + '/users';

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<{ token: string }>(this.urlLogin, {
        emailUs: email,
        passwordUs: password,
      })
      .pipe(
        tap((response: { token: string }) => {
          this.tokenService.login(response.token);
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
  }

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

  updateShipmentStatus(idSh: number, status: string) {
    return this.http.patch(`${this.urlShipments}/${idSh}`, { status });
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

  getActiveLocalities(): Observable<any> {
    return this.http.get(`${this.urlLocalities}/active`);
  }

  updateLocality(idLo: number, updatedData: any): Observable<any> {
    return this.http.patch(`${this.urlLocalities}/${idLo}`, updatedData);
  }

  deleteLocality(idLo: number): Observable<any> {
    return this.http.patch(`${this.urlLocalities}/${idLo}/deactivate`, {});
  }

  activateLocality(idLo: number): Observable<any> {
    return this.http.patch(`${this.urlLocalities}/${idLo}/activate`, {});
  }

  newLocality(nameLo: string, postalCode: number, cost: number): Observable<any> {
    return this.http.post(this.urlLocalities, { nameLo, postalCode, cost });
  }

  changePassword(data: { idUs: number, currentPassword: string, newPassword: string }) {
    const { idUs, ...passwordData } = data;
    return this.http.patch(`${this.urlUsers}/${idUs}/password`, passwordData);
  }

  updateProfile(data: any) {
    const { idUs, ...profileData } = data;
    return this.http.patch(`${this.urlUsers}/${idUs}`, profileData);
  }

  deleteAccount(idUs: number, password: string) {
    return this.http.patch(`${this.urlUsers}/${idUs}/deactivate`, { password });
  }

  getUsersWithStats(): Observable<any> {
    return this.http.get(`${this.urlUsers}/stats`);
  }

}