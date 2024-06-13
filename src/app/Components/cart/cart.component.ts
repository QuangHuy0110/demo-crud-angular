import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Service/cart.service';
import { Cart, Product } from '../../Types';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  items: Cart[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getItems().subscribe(
      data => {
        this.items = data
      }
    );
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  deleteItem(id: number): void {
    console.log(id)
    this.cartService.deleteProductByid(id)
  }

  handleChangeQty(id: number): void { }
}
