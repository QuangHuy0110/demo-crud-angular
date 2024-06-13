import { Component, DoCheck, OnInit } from '@angular/core';
import { CartService } from '../../Service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, DoCheck {

  quantity: number = 0;

  constructor(private cartService: CartService) {

  }


  ngDoCheck(): void {
    // this.quantity = this.cartService.getQuantityCart()
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.cartService.getQuantityCart().subscribe(
      quantity => {
        this.quantity = quantity;
      }
    )
  }



}
