import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginFormComponent } from './pages/login-page/login-form/login-form.component';
import { SignupFormComponent } from './pages/login-page/signup-form/signup-form.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { OrderHistoryPageComponent } from './pages/order-history-page/order-history-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomepageComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'cart', component: CartPageComponent },
      {
        path: 'checkout',
        component: CheckoutPageComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
         canActivate: [AuthGuard],
      },
      { path: 'product/:id', component: ProductPageComponent },
      { path: 'product', component: ProductPageComponent },
      { path: 'history', component: OrderHistoryPageComponent },
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      { path: 'info', component: LoginFormComponent },
      // { path: 'signup', component: SignupFormComponent },
    ],
  },
  {
    path: '',
    component: LoginPageComponent,
    children: [
      { path: 'login', component: LoginFormComponent },
      { path: 'signup', component: SignupFormComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
