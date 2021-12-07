import { Component, Injector, OnInit } from '@angular/core';
import { CartResponse, UpdateCart } from 'src/app/model/cart';
import { Product } from 'src/app/model/product';
import { Response } from 'src/app/model/api/response';
import { ShoppingItem } from 'src/app/model/shoppingItem';
import { ShoppingCartService } from 'src/app/services/API/ShoppingCart/ShoppingCart.service';
import { AuthService } from 'src/app/services/API/auth.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { UserShoppingCartService } from 'src/app/services/API/ShoppingCart/UserShoppingCart.service';
import { Shippingcost } from 'src/app/model/shippingcost';

@Component({
  selector: 'app-base',
  template: ``,
})
export class CartBaseComponent implements OnInit {
  productList: Product[] = [];
  subTotalPrice = 0;
  shipping = 0;
  totalPrice = 0;

  get loggedUser(): boolean {
    return this.authService.isLogin();
  }

  get shoppingService(): ShoppingCartService {
    return this.inject.get(ShoppingCartService);
  }
  get userShoppingService(): UserShoppingCartService {
    return this.inject.get(UserShoppingCartService);
  }
  get authService(): AuthService {
    return this.inject.get(AuthService);
  }

  protected get snackBarService(): SnackBarService {
    return this.inject.get(SnackBarService);
  }

  private sucessMessage = 'product added to cart successfully';
  private failMessage = `product didn't added to cart`;

  constructor(private inject: Injector) {}

  ngOnInit(): void {}

  addToCart(product: Product, quantity: number): void {
    if (this.loggedUser) {
      this.userShoppingService.addToCart(product.id, quantity).subscribe(
        () => {
          this.snackBarService.sucessMessage(this.sucessMessage);
          this.shoppingService.updateItem(product, quantity);
        },
        (error) => {
          console.log(error);
          this.snackBarService.failMessage(this.failMessage);
        }
      );
    } else {
      this.shoppingService.updateItem(product, quantity);
      this.snackBarService.sucessMessage(this.sucessMessage);
    }
  }

  removeFromCart(product: Product): void {
    if (this.loggedUser) {
      const updateCart = {
        cart: product.cart?.cart_id,
        item: product.id,
      } as UpdateCart;
      this.userShoppingService.removeFromCart(updateCart).subscribe(
        (response: Response<CartResponse>) => {
          if (response.status) {
            this.snackBarService.sucessMessage(this.sucessMessage);
            this.shoppingService.removeFromCart(product);
          } else {
            this.snackBarService.failMessage(response.message);
            console.log(response);
          }
        },
        (error) => {
          console.log(error);
          this.snackBarService.failMessage(this.failMessage);
        }
      );
    } else {
      this.shoppingService.removeFromCart(product);
    }
  }

  async calculateSubtotal(productList: Product[]): Promise<number> {
    if (this.loggedUser) {
      return (await this.userShoppingService.getFromCart().toPromise()).data
        .total;
    }
    return new ShoppingItem(productList).getTotalPrice();
  }

  async getShipping(addressId: number): Promise<Shippingcost> {
    const serviceRsponse = await this.userShoppingService
      .getShippingcost(addressId)
      .toPromise();
    return (serviceRsponse as Response<Shippingcost>).data;
  }

  getObserveProducts(): void {
    this.shoppingService.currentProductList.subscribe({
      next: async (productList) => {
        this.productList = productList;
        this.subTotalPrice = await this.calculateSubtotal(productList);
      },
    });
  }
}
