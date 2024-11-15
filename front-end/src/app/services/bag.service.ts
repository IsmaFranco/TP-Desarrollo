import { Injectable } from '@angular/core';
import { User } from '../models/clothes.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BagService {
private bagItems: any[] = [];

constructor(private http: HttpClient) {
  if (this.isLocalStorageAvailable()) {
    this.loadBagFromLocalStorage();
  }
}

private isLocalStorageAvailable(): boolean {
  return typeof window !== 'undefined' && !!window.localStorage;
}

private loadBagFromLocalStorage() {
  if (this.isLocalStorageAvailable()) {
    const storedBag = localStorage.getItem('bagItems');
    if (storedBag) {
      this.bagItems = JSON.parse(storedBag);
    }
  }
}

private saveBagToLocalStorage() {
  if (this.isLocalStorageAvailable()) {
    localStorage.setItem('bagItems', JSON.stringify(this.bagItems));
  }
}

// Añadir producto con control de stock
addToBag(product: any) {
  const existingProduct = this.bagItems.find(clothes => clothes.idCl === product.idCl);
  if (existingProduct) {
    // Verificar stock antes de añadir
    if (existingProduct.quantity < product.stock) {
      existingProduct.quantity += 1;
    } else {
      alert(`Stock insuficiente para el producto ${product.nameCl}`);
    }
  } else {
    // Añadir producto nuevo con cantidad inicial de 1
    this.bagItems.push({ ...product, quantity: 1 });
  }
  this.saveBagToLocalStorage(); 
}

// Eliminar una unidad del producto específico
removeFromBag(productId: number) {
  const productIndex = this.bagItems.findIndex(clothes => clothes.idCl === productId);
  if (productIndex !== -1) {
    const product = this.bagItems[productIndex];
    if (product.quantity > 1) {
      product.quantity -= 1;
    } else {
      // Eliminar si la cantidad es 1
      this.bagItems.splice(productIndex, 1);
    }
    this.saveBagToLocalStorage(); 
  }
}

// Obtener todos los productos del carrito
getBagItems(): any[] {
  return this.bagItems;
}

// Vaciar el carrito al cerrar sesión
clearBag() {
  this.bagItems = [];
  if (this.isLocalStorageAvailable()) {
    localStorage.removeItem('bagItems');
  }
}
}