import { Injectable } from '@angular/core';
import { Cart, Product } from '../Types';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartList = new BehaviorSubject<Cart[]>([]);

    private total = new BehaviorSubject<number>(0)

    addToCart(product: Product, qty = 1): void {
        // const existing = this.items.find(item => item.id === product.id);

        // this.total += qty;

        // if (existing) {
        //     existing.quantity += qty;
        //     return;
        // }

        // this.items.push({ ...product, quantity: qty });
        const currentCartList = this.cartList.value;
        const currentTotal = this.total.value;
        const existingIndex = currentCartList.findIndex(item => item.id === product.id)

        if (existingIndex !== -1) {
            currentCartList[existingIndex].quantity += qty;
        } else {
            currentCartList.push({ ...product, quantity: qty });
        }

        this.cartList.next(currentCartList);
        this.total.next(currentTotal + qty);
    }

    getItems(): Observable<Cart[]> {
        return this.cartList.asObservable();
    }

    clearCart(): void {
        this.cartList.next([]);
        this.total.next(0);
    }

    deleteProductByid(id: number) {
        const currentCart = this.cartList.value;
        const productIndex = currentCart.findIndex(item => item.id === id);

        if (productIndex > -1) {
            const productQuantity = currentCart[productIndex].quantity;
            // Remove the product from the cart
            currentCart.splice(productIndex, 1);
            // Update the cart list
            this.cartList.next(currentCart);
            // Update the total quantity
            const currentTotal = this.total.value;
            this.total.next(currentTotal - productQuantity);
        }
    }

    getQuantityCart() {
        return this.total;
    }
}
