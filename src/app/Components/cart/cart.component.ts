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

  totalPrice: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getItems().subscribe(
      data => {
        this.items = data
      }
    );
    this.cartService.getTotalPrice().subscribe(
      data => {
        this.totalPrice = data
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

  handleChangeQty(product: Product,qty: string): void { 
    const quantity = Number(qty);
    if(quantity <= 0){
      this.cartService.deleteProductByid(product.id);
      return;
    }
    this.cartService.changeQuantity(product, Number(qty));
   }
}
