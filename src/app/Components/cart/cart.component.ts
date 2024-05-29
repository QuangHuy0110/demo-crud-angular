import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Service/cart.service';
import { Product } from '../../Types';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  items: Product[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.items = this.cartService.getItems();
  }

  clearCart(): void {
    this.items = this.cartService.clearCart();
  }

  deleteItem(id: number): void {
    console.log(id)
    this.items = this.cartService.deleteProductByid(id)
  }

  // onChangeTotal(index: number, value: number) {
  //   const item = this.items[index];
  //   item. = value
  // }
}
