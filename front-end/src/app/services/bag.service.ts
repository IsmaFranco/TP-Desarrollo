import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BagService {
/*private bagItems = new BehaviorSubject<any[]>([]);
currentBagItems = this.bagItems.asObservable();

addToBag(product: any) {
  const currentItems = this.bagItems.getValue();
  
  // Buscar si el producto con el mismo ID ya está en el carrito
  const itemInCart = currentItems.find(clothes => clothes.idCl === product.idCl);
  
  if (itemInCart) {
    // Si el producto ya está en el carrito, aumentar solo su cantidad
    if (itemInCart.quantity < product.stock) {
      itemInCart.quantity += 1;
    }
    else{
      alert("No puedes añadir más, stock insuficiente");
    }
  } else {
    // Si no está, hacer una copia del producto con una cantidad inicial
    currentItems.push({ ...product, quantity: 1 });
  }
  
  // Actualizar la lista de productos en el carrito
  this.bagItems.next([...currentItems]);
}

clearBag() {
  this.bagItems.next([]);  // Reinicia el carrito a un array vacío
}

removeFromBag(productId: number) {
  const currentItems = this.bagItems.getValue();
  
  // Encuentra el producto a eliminar o decrementar
  const itemInCart = currentItems.find(clothes => clothes.idCl === productId);

  if (itemInCart) {
    // Si la cantidad es mayor a 1, solo decrementar la cantidad
    if (itemInCart.quantity > 1) {
      itemInCart.quantity -= 1;
    } else {
      // Si la cantidad es 1, eliminar el producto del carrito
      const updatedItems = currentItems.filter(clothes => clothes.idCl !== productId);
      this.bagItems.next(updatedItems);
    }
  }
}

showMessage(message: string) {
  console.log(message);}
*/
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