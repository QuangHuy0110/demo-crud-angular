import { Injectable } from '@angular/core';
import { Product } from '../Types';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private items: Product[] = [];

    addToCart(product: Product): void {
        this.items.push(product);
    }

    getItems(): Product[] {
        return this.items;
    }

    clearCart(): Product[] {
        this.items = [];
        return this.items;
    }

    deleteProductByid(id: number) {
        this.items = this.items.filter((item) => item.id !== id)
        return this.items
    }
}
