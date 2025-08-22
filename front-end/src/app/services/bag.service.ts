import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
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
    const existingProduct = this.bagItems.find(
      (clothes) => clothes.idCl === product.idCl
    );
    if (!existingProduct && product.quantity === 0) {
      Swal.fire({
        title: 'Error',
        text: 'Please select a quantity',
        icon: 'error',
        timer: 1300,
        showConfirmButton: false,
      });
      return;
    }
    if (existingProduct) {
      if (
        product.quantity === 0 &&
        product.quantity < existingProduct.stock &&
        existingProduct.quantity !== existingProduct.stock
      ) {
        Swal.fire({
          title: 'Error',
          text: 'Please select a quantity',
          icon: 'error',
          timer: 1300,
          showConfirmButton: false,
        });
        return;
      }
      if (existingProduct.quantity === existingProduct.stock) {
        Swal.fire({
          icon: 'error',
          title: 'Maximum stock reached',
          text: 'No more units of this product can be added to the cart',
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        const originalQuantity = existingProduct.quantity;
        const newQuantity = Math.min(
          existingProduct.stock,
          existingProduct.quantity + product.quantity
        );
        const actuallyAdded = newQuantity - originalQuantity;
        existingProduct.quantity = newQuantity;
        Swal.fire({
          icon: 'success',
          title: 'Product added to cart',
          text: `Added ${actuallyAdded} units to the cart`,
          timer: 1700,
          showConfirmButton: false,
        });
      }
    } else {
      this.bagItems.push(product);
      Swal.fire({
        icon: 'success',
        title: `Added ${product.quantity} units to the cart`,
        timer: 1300,
        showConfirmButton: false,
      });
    }
    this.saveBagToLocalStorage();
  }

  removeFromBag(productId: number) {
    const productIndex = this.bagItems.findIndex(
      (clothes) => clothes.idCl === productId
    );
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
