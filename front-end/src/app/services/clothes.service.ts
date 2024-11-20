import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClothesService {

  private urlBase: string= 'http://localhost:3000/clothes';

  constructor(private http: HttpClient) { }
  
  getProducts(): Observable<any> {
    return this.http.get(this.urlBase);
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.urlBase}/${id}`);
  }

  updateProductPrice(productId: number, newPrice: number): Observable<any> {
    return this.http.put<any>(`${this.urlBase}/${productId}/new-price`, { price: newPrice });
  }
  
  updateProductStock(productId: number, newStock: number): Observable<any> {
    return this.http.put<any>(`${this.urlBase}/${productId}/add-stock`, { stock: newStock });
  }

}
