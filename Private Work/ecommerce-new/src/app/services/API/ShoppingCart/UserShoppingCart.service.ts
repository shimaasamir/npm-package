import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, CartResponse, UpdateCart } from 'src/app/model/cart';
import { Response } from 'src/app/model/api/response';
import { DataService } from '../Base/http.service';
import { Product } from 'src/app/model/product';

@Injectable({
  providedIn: 'root',
})
export class UserShoppingCartService extends DataService {
  private cartUrl = '';
  private shippingcostUrl = '';
  private checkOutUrl = '';

  private productListItemSource = new BehaviorSubject<Product[]>([]);
  currentProductList = this.productListItemSource.asObservable();
  productList: Product[] = [];

  constructor(http: HttpClient) {
    super(http);
    this.cartUrl = this.url.cart.CartUrl;
    this.shippingcostUrl = this.url.cart.ShippingcostUrl;
    this.checkOutUrl = this.url.cart.CheckOutUrl;
  }

  removeFromCart(updateCart: UpdateCart): Observable<any> {
    return this.http.request('delete', `${this.domain}/${this.cartUrl}`, {
      body: updateCart,
    });
  }

  addToCart(productId: number, quatity: number): Observable<any> {
    const cartItem = this.setCartItem(productId, quatity);
    return this.http.post(`${this.domain}/${this.cartUrl}`, cartItem);
  }

  getFromCart(): Observable<Response<CartResponse>> {
    return this.get<Response<CartResponse>>(this.cartUrl);
  }

  // tslint:disable-next-line: variable-name
  getShippingcost(ship_to: number): Observable<any> {
    const data = { ship_to };
    return this.post(this.shippingcostUrl, data);
  }

  // tslint:disable-next-line: variable-name
  checkOut(payment_method: number, ship_to: number): Observable<any> {
    const data = { payment_method, ship_to };
    return this.post(this.checkOutUrl, data);
  }

  // tslint:disable-next-line: variable-name
  private setCartItem(product_id: number, quantity: number): CartItem {
    return { product_id, quantity } as CartItem;
  }
}
