import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductDetailComponent } from './Components/product-detail/product-detail.component';
import { CartComponent } from './Components/cart/cart.component';
import { CartService } from './Service/cart.service';
import { ProductService } from './Service/product.service';
import { HighlightDirective } from './Directives/highlight.directive';
import { PriceFormatPipe } from './Pipes/price-format.pipe';
import { HeaderComponent } from './Components/header/header.component';
import { ProductCardComponent } from './Components/product-list/product-card/product-card.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthService } from './Service/auth.service';
import { EllipsisPipe } from './Pipes/ellicips.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { NotificationService } from './Service/notification.service';
import { Ability, createMongoAbility, PureAbility } from '@casl/ability';
import { AblePipe } from './Pipes/able.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    CartComponent,
    HighlightDirective,
    PriceFormatPipe,
    HeaderComponent,
    ProductCardComponent,
    RegisterComponent,
    LoginComponent,
    PriceFormatPipe,
    EllipsisPipe,
    AblePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DemoNgZorroAntdModule,
  ],
  providers: [CartService, ProductService, AuthService, NotificationService,
    { 
      provide: Ability,
      useValue: new Ability([])
    },
    {
      provide: PureAbility,
      useExisting: Ability
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
