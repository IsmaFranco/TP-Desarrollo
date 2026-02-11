import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../../environments';
import { User } from '../models/clothes.model';
import { Clothes } from '../models/clothes.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private API_URL = `${API_CONFIG.API_URL}/payment`;

  constructor(private http: HttpClient) { }

  createPayment(items: Clothes[], user: User) {
    return this.http.post<{ init_point: string }>(this.API_URL, { items, user });
  }
}
