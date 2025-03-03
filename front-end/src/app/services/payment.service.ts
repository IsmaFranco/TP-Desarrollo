import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../environments';
import { User } from '../models/clothes.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = API_CONFIG.URL_PAYMENTS;

  constructor(private http: HttpClient) {}

  createPayment(items: any[], user: User) {
    return this.http.post<{ init_point: string }>(this.apiUrl, { items, user });
  }
}
