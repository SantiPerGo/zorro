import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private _products: WritableSignal<Product[]> = signal([]);

  constructor() {}

  public addProduct(product: Product) {
    if(!product.id) return;

    const item: Product = {
      productId: product.id,
      quantity: 1,
      productName: product.productName,
      price: product.price
    };

    this._products.update((list: Product[]) => {
      let isNewProduct: boolean = true;
      
      for (const product of list) {
        if(product.productId === item.productId) {          
          product.quantity++;
          isNewProduct = false;

          if(product.price) {            
            const price = product.price * product.quantity;
            product.price = Math.round((price + Number.EPSILON) * 100) / 100;
          }

          break;
        }
      }

      if(isNewProduct)
        list = [...list, item];

      return list;
    });
  }

  get products(): Signal<Product[]> {
    return this._products;
  }

  public cleanCart() {
    this._products.set([]);
  }
}
