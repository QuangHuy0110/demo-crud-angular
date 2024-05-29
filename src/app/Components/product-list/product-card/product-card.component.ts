import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../Types';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product: Product;
  @Output() viewDetail = new EventEmitter<number>();

  viewDetailChild(id: number) {
    this.viewDetail.emit(id)
  }
}
