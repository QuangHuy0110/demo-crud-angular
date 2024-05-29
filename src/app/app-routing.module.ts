import { NgModule } from '@angular/core';
import { ProductListComponent } from './Components/product-list/product-list.component';
import { ProductDetailComponent } from './Components/product-detail/product-detail.component';
import { CartComponent } from './Components/cart/cart.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { AuthGuard } from './guard/auth.guard';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: '/products', pathMatch: 'full' },
    { path: 'products', component: ProductListComponent },
    { path: 'product/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
    { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
    { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
