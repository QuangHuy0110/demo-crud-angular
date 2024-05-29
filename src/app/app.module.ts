import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductDetailComponent } from './Components/product-detail/product-detail.component';
import { CartComponent } from './Components/cart/cart.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { CartService } from './Service/cart.service';
import { ProductService } from './Service/product.service';
import { HighlightDirective } from './Directives/highlight.directive';
import { PriceFormatPipe } from './Pipes/price-format.pipe';
import { HeaderComponent } from './Components/header/header.component';
import { EllipsisPipe } from './Pipes/ellicips.pipe';
import { ProductCardComponent } from './Components/product-list/product-card/product-card.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    CartComponent,
    CheckoutComponent,
    HighlightDirective,
    PriceFormatPipe,
    EllipsisPipe,
    HeaderComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CartService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
