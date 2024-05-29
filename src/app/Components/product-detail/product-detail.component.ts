import { Component, OnInit } from '@angular/core';
import { Product } from '../../Types';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Service/product.service';
import { CartService } from '../../Service/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.getProductById(id)
  }

  getProductById(id: number) {
    this.productService.getProductById(id).subscribe((data) => {
      this.product = data
    }, err => {
      console.log(err);
    })
  }
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }
}
