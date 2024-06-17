import { Component, OnInit } from '@angular/core';
import { CartService } from '../../Service/cart.service';
import { Cart, Product } from '../../Types';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NotificationService } from '../../Service/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  items: Cart[] = [];

  totalPrice: number = 0;

  isVisible: boolean = false;

  checkoutForm: FormGroup;

  constructor(
    private cartService: CartService,
    private modal: NzModalService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) { }

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
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  deleteItem(id: number): void {
    console.log(id)
    this.cartService.deleteProductByid(id)
  }

  handleChangeQty(product: Product, qty: string): void {
    const quantity = Number(qty);
    if (quantity <= 0) {
      this.cartService.deleteProductByid(product.id);
      return;
    }
    this.cartService.changeQuantity(product, Number(qty));
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    if (!this.checkoutForm.valid) {
      this.markFormGroupTouched(this.checkoutForm);
      return;
    }
    this.notificationService.createNotification('success', 'Success', 'Your order has been submitted successfully!')
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }
}
