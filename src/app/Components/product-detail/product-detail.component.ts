import { Component, OnInit } from '@angular/core';
import { Cart, Product } from '../../Types';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Service/product.service';
import { CartService } from '../../Service/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  cartList: Cart[] = [];
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.getProductById(id);
    this.cartService.getItems().subscribe((data) => {
      this.cartList = data;
    });
  }

  getProductById(id: number) {
    this.productService.fetchProductById(id).subscribe(
      (data) => {
        this.product = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  checkExistInCart(id: number) {
    return this.cartList.findIndex(item=> item.id === id) !== -1
  }

  addToCart(product: Product): void {
    if (this.checkExistInCart(product.id)) {
      window.alert('item already in cart, please select another one!');
      return;
    }
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }
}
