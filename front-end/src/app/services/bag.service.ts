import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class BagService {
private bagItems: any[] = [];

constructor() {
  if (this.isLocalStorageAvailable()) {
    this.loadBagFromLocalStorage();
  }
}

private isLocalStorageAvailable(): boolean {
  return typeof window !== 'undefined' && !!window.localStorage;
}

private loadBagFromLocalStorage() {
  const storedBag = localStorage.getItem('bagItems');
  if (storedBag) {
    this.bagItems = JSON.parse(storedBag);
  }
}

private saveBagToLocalStorage() {
  if (this.isLocalStorageAvailable()) {
    localStorage.setItem('bagItems', JSON.stringify(this.bagItems));
  }
}

addToBag(product: any) {
  const existingProduct = this.bagItems.find(clothes => clothes.idCl === product.idCl);
  if (existingProduct) {
    Swal.fire({
      icon: 'error',
      title: 'Producto ya añadido',
      timer: 1000,
      showConfirmButton: false,
    });
  } else {
    this.bagItems.push(product);
    Swal.fire({
      icon: 'success',
      title: 'Producto añadido al carrito',
      timer: 1000,
      showConfirmButton: false,
    });
  }
  this.saveBagToLocalStorage(); 
}

removeFromBag(productId: number) {
  const productIndex = this.bagItems.findIndex(clothes => clothes.idCl === productId);
  if (productIndex !== -1) {
    const product = this.bagItems[productIndex];
    if (product.quantity > 1) {
      product.quantity -= 1;
    } else {
      this.bagItems.splice(productIndex, 1);
    }
    this.saveBagToLocalStorage(); 
  }
}

getBagItems(): any[] {
  return this.bagItems;
}

clearBag() {
  this.bagItems = [];
  if (this.isLocalStorageAvailable()) {
    localStorage.removeItem('bagItems');
  }
}
}