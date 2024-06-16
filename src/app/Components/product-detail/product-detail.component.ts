import { Component, OnInit } from '@angular/core';
import { Cart, Product } from '../../Types';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../Service/product.service';
import { CartService } from '../../Service/cart.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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
    private cartService: CartService,
    private notificationService: NzNotificationService,
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.getProductById(id);
    this.cartService.getItems().subscribe((data) => {
      this.cartList = data;
    });
  }

  createNotification(type: 'success' | 'info' | 'warning' | 'error', title: string, content: string): void {
    this.notificationService.create(
      type,
      title,
      content
    );
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
    return this.cartList.findIndex(item => item.id === id) !== -1
  }

  addToCart(product: Product): void {
    if (this.checkExistInCart(product.id)) {
      this.createNotification('warning', 'warning', 'This product already exists in the cart')
      return;
    }
    this.cartService.addToCart(product);
    this.createNotification('success', 'Success', 'add item successfully!')
  }
}
