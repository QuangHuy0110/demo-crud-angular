import { Component, OnInit } from '@angular/core';
import { Product } from '../../Types';
import { ProductService } from '../../Service/product.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  isLoading: boolean = false;
  constructor(
    private productService: ProductService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts() {
    this.isLoading = true
    this.productService.fetchProducts().subscribe();
    this.productService.getProducts().subscribe(
      data => {
        this.products = data;
      }
    );
  }
  viewDetail(id: number) {
    this.router.navigate([`/product/${id}`,]);
  }
}
