import { Injectable } from '@angular/core';
import { Cart, Product } from '../Types';
import { BehaviorSubject, Observable, map, reduce } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartList = new BehaviorSubject<Cart[]>([]);

  private totalQuantiTy = new BehaviorSubject<number>(0);

  changeQuantity(product: Product, qty = 1): void {
    const currentCartList = this.cartList.value;
    const existingIndex = currentCartList.findIndex(
      (item) => item.id === product.id
    );

    if (existingIndex !== -1) {
      currentCartList[existingIndex].quantity = qty;
    } else {
      currentCartList.push({ ...product, quantity: qty });
    }

    this.cartList.next(currentCartList);
  }

  addToCart(product: Product) {
    const currentCartList = this.cartList.value;
    currentCartList.push({ ...product, quantity: 1 });
    this.cartList.next(currentCartList);
  }

  getItems(): Observable<Cart[]> {
    return this.cartList.asObservable();
  }

  clearCart(): void {
    this.cartList.next([]);
    this.totalQuantiTy.next(0);
  }

  deleteProductByid(id: number) {
    const currentCart = this.cartList.value;
    const productIndex = currentCart.findIndex((item) => item.id === id);

    if (productIndex > -1) {
      currentCart.splice(productIndex, 1);
      this.cartList.next(currentCart);
    }
  }

  getQuantityCart(): Observable<number> {
    return this.cartList
      .asObservable()
      .pipe(
        map((cartList) =>
          cartList.reduce((acc, item) => acc + item.quantity, 0)
        )
      );
  }

  getTotalPrice(): Observable<number> {
    return this.cartList
      .asObservable()
      .pipe(
        map((cartList) =>
          cartList.reduce((acc, item) => acc + item.quantity * item.price, 0)
        )
      );
  }
}
