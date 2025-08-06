import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../environments';

@Injectable({
  providedIn: 'root',
})
export class ClothesService {
  private urlBase = `${API_CONFIG.API_URL}/clothes`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(this.urlBase);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.urlBase}/${id}`);
  }

  getProductsByType(type: string): Observable<any> {
    return this.http.get(`${this.urlBase}/type/${type}`);
  }

  updateProductPrice(productId: number, newPrice: number): Observable<any> {
    return this.http.put<any>(`${this.urlBase}/${productId}/new-price`, {
      price: newPrice,
    });
  }

  updateProductStock(productId: number, newStock: number): Observable<any> {
    return this.http.put<any>(`${this.urlBase}/${productId}/add-stock`, {
      stock: newStock,
    });
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.urlBase}/${id}`);
  }
}
