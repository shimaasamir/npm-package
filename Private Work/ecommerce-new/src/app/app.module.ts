import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NguCarouselModule } from '@ngu/carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { IconsComponent } from './shared/icons/icons.component';
import { CartComponent } from './layout/header/components/cart/cart.component';
import { LoginComponent } from './layout/header/components/login/login.component';
import { IconComponent } from './shared/icons/icon/icon.component';
import { HeaderMenuComponent } from './layout/header/components/header-menu/header-menu.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SliderComponent } from './pages/homepage/slider/slider.component';
import { HomeSearchComponent } from './pages/homepage/slider/home-search/home-search.component';
import { HomeCategoriesComponent } from './pages/homepage/home-categories/home-categories.component';
import { CategoryComponent } from './pages/homepage/home-categories/category/category.component';
import { ProductCardComponent } from './shared/product-card/product-card.component';
import { HomeServicesComponent } from './pages/homepage/home-services/home-services.component';
import { ServiceComponent } from './pages/homepage/home-services/service/service.component';
import { HomeProductsComponent } from './pages/homepage/home-products/home-products.component';
import { HomeFeatureCardComponent } from './pages/homepage/home-feature-card/home-feature-card.component';
import { CategoryService } from './services/API/category/category.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeService } from './services/API/home/home.service';
import { CategoriesComponent } from './pages/categories/categories.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesFilterComponent } from './shared/categories-filter/categories-filter.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CartProductComponent } from './pages/cart-page/cart-product/cart-product.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { FormGroupComponent } from './shared/form-group/form-group.component';
import { AddressFormComponent } from './pages/checkout-page/components/address-form/address-form.component';
import { AddressListComponent } from './pages/checkout-page/components/address-list/address-list.component';
import { CouponComponent } from './pages/checkout-page/components/coupon/coupon.component';
import { OrderProductsComponent } from './pages/checkout-page/components/order-products/order-products.component';
import { PaymentComponent } from './pages/checkout-page/components/payment/payment.component';
import { OrderProductItemComponent } from './pages/checkout-page/components/order-products/order-product-item/order-product-item.component';
import { AddressItemComponent } from './pages/checkout-page/components/address-list/address-item/address-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubCategoryListComponent } from './shared/sub-category-list/sub-category-list.component';
import { MultiSelectComponent } from './shared/multi-select/multi-select.component';
import { LocalDataService } from './services/LocalData.service';
import { PriceListComponent } from './shared/price-list/price-list.component';
import { BaseComponent } from './shared/base/base.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { VehicleService } from './services/API/vehicle/vehicle.service';
import { SnackBarService } from './services/snack-bar.service';
import { CartBaseComponent } from './shared/base/cart-base.component';
import { ShoppingCartService } from './services/API/ShoppingCart/ShoppingCart.service';
import { Interceptoers } from './interceptors/index.interceptors';
import { UserShoppingCartService } from './services/API/ShoppingCart/UserShoppingCart.service';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrderItemComponent } from './shared/order-item/order-item.component';
import { LoginFormComponent } from './pages/login-page/login-form/login-form.component';
import { SignupFormComponent } from './pages/login-page/signup-form/signup-form.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { SocialLoginComponent } from './pages/login-page/social-login/social-login.component';

import { OvelLoaderComponent } from './shared/ovel-loader/ovel-loader.component';
import { ValidationComponent } from './shared/validation/validation.component';
import { ErrorDetailsComponent } from './shared/error-details/error-details.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RatingBarComponent } from './pages/product-page/rating-bar/rating-bar.component';
import { ReviewerComponent } from './pages/product-page/reviewer/reviewer.component';
import { StatusStepsComponent } from './shared/order-item/status-steps/status-steps.component';
import { RatingComponent } from './shared/order-item/rating/rating.component';
import { OrderHistoryPageComponent } from './pages/order-history-page/order-history-page.component';
import { FooterFeatureComponent } from './layout/footer/footer-feature/footer-feature.component';
import { CheckoutFormComponent } from './pages/checkout-page/components/checkout-form/checkout-form.component';
import { FormGroupMaterialComponent } from './shared/form-group-material/form-group-material.component';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

import { PasswordFormMaterialComponent } from './shared/password-form-material/password-form-material.component';
import { MatButtonModule } from '@angular/material/button';
import { InfoComponent } from './pages/profile/info/info.component';
import { PersonalInfoComponent } from './pages/profile/info/components/personal-info/personal-info.component';
import { ChangePasswordComponent } from './pages/profile/info/components/change-password/change-password.component';
import { SavedAddressesComponent } from './pages/profile/info/components/saved-addresses/saved-addresses.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IconsComponent,
    CartComponent,
    LoginComponent,
    IconComponent,
    HeaderMenuComponent,
    HomepageComponent,
    SliderComponent,
    HomeSearchComponent,
    HomeCategoriesComponent,
    CategoryComponent,
    ProductCardComponent,
    HomeServicesComponent,
    ServiceComponent,
    HomeProductsComponent,
    HomeFeatureCardComponent,
    CategoriesComponent,
    CategoriesFilterComponent,
    PaginationComponent,
    CartPageComponent,
    CartProductComponent,
    CheckoutPageComponent,
    FormGroupComponent,
    AddressFormComponent,
    AddressListComponent,
    CouponComponent,
    OrderProductsComponent,
    PaymentComponent,
    OrderProductItemComponent,
    AddressItemComponent,
    SubCategoryListComponent,
    MultiSelectComponent,
    PriceListComponent,
    BaseComponent,
    CartBaseComponent,
    LoginPageComponent,
    ProfileComponent,
    OrderItemComponent,
    LoginFormComponent,
    SignupFormComponent,
    MainLayoutComponent,
    SocialLoginComponent,
    OvelLoaderComponent,
    ValidationComponent,
    ErrorDetailsComponent,
    ProductPageComponent,
    RatingBarComponent,
    ReviewerComponent,
    StatusStepsComponent,
    RatingComponent,
    OrderHistoryPageComponent,
    FooterFeatureComponent,
    CheckoutFormComponent,
    FormGroupMaterialComponent,
    PasswordFormMaterialComponent,
    InfoComponent,
    PersonalInfoComponent,
    ChangePasswordComponent,
    SavedAddressesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    MatSnackBarModule,
    MatSelectModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    FormsModule,
    MatIconModule,
    AutocompleteLibModule,
    NgCircleProgressModule.forRoot({
      backgroundOpacity: 1,
      radius: 60,
      space: -10,
      outerStrokeGradient: true,
      outerStrokeWidth: 10,
      outerStrokeColor: '#ffc107',
      outerStrokeGradientStopColor: '#ffc107',
      innerStrokeColor: '#e7e8ea',
      innerStrokeWidth: 10,
      imageHeight: 114,
      animateTitle: true,
      animationDuration: 1000,
      showUnits: false,
      showBackground: false,
      showSubtitle: false,
      titleFontSize: '90',
      responsive: true,
      renderOnClick: false,
      lazy: false,
    }),
    MatProgressBarModule,
    NgbModule,
  ],
  providers: [
    Interceptoers,
    CategoryService,
    HomeService,
    LocalDataService,
    VehicleService,
    SnackBarService,
    UserShoppingCartService,
    ShoppingCartService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
