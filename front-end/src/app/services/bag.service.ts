import { Injectable } from '@angular/core';

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

addToBag(product: any) {
  const existingProduct = this.bagItems.find(clothes => clothes.idCl === product.idCl);
  /*if (existingProduct) {
    if (existingProduct.quantity < product.stock) {
      existingProduct.quantity += 1;
    } else {
      alert(`Stock insuficiente para el producto ${product.nameCl}`);
    }*/
  if (existingProduct) {
    alert(`El producto ${product.nameCl} ya está en la bolsa`);
  } else {
    this.bagItems.push(product);
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