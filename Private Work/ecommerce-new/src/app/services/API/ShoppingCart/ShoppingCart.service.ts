import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  CloneObject,
  ConvertObjectToString,
  IsNullOrEmptyString,
  ObjectHasValue,
} from 'src/app/helper/helper';
import { Product } from 'src/app/model/product';
import { SessionService } from '../../LocalStorage/session.service';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private productList: Product[] = [] as Product[];
  private productListItemSource = new BehaviorSubject<Product[]>([]);

  /**
   * Observable of current product list in user cart
   */
  currentProductList = this.productListItemSource.asObservable();

  constructor(
    private sessionService: SessionService,
    private authService: AuthService
  ) {}

  private productChange(): void {
    if (!this.authService.isLogin()) {
      const obj = ConvertObjectToString(this.productList);
      this.sessionService.setProducts(obj);
    }
    this.productListItemSource.next(this.productList);
  }

  /**
   * Get user stored Products from local storage
   */
  getProductsBeforeLogin(): void {
    const productsString = this.sessionService.getProducts();
    if (!IsNullOrEmptyString(productsString)) {
      this.productList = JSON.parse(productsString);
    }
    this.productChange();
  }

  /** Set Product datasource from the api
   * in case the user logged in and already have products
   */
  setProducts(products: Product[]): void {
    this.productList = products;
    this.productChange();
  }
  removeFromCart(product: Product): void {
    if (product && ObjectHasValue(product)) {
      this.productList = this.productList.filter(
        (prod) => prod.id !== product.id
      );
    }
    this.productChange();
  }

  updateItem(product: Product, change: number): void {
    const item = this.productList.find((prod) => prod.id == product.id);
    if (
      item &&
      ObjectHasValue(item) &&
      item.quantity >= 0 &&
      item.quantity <= item.stock_quantity
    ) {
      item.quantity = change;
    } else if (!item) {
      const prod = this.setCartProduct(product, change);
      this.productList.push(prod);
    }
    this.productChange();
  }

  private setCartProduct(product: Product, quantity: number): Product {
    if (product && ObjectHasValue(product)) {
      const productItem = CloneObject(product);
      productItem.quantity = quantity;
      return productItem;
    }
    return {} as Product;
  }

  clearProducts(): void {
    this.productList = [];
    this.productChange();
  }
}
