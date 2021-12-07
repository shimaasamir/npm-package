import { Component, Injector, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ShoppingCartService } from 'src/app/services/API/ShoppingCart/ShoppingCart.service';
import { CartBaseComponent } from 'src/app/shared/base/cart-base.component';

@Component({
  selector: 'app-order-products',
  templateUrl: './order-products.component.html',
  styleUrls: ['./order-products.component.scss'],
})
export class OrderProductsComponent
  extends CartBaseComponent
  implements OnInit {
  productList: Product[];
  @Input() shipping: number;

  get total(): number {
    return this.subTotalPrice + this.shipping;
  }

  constructor(inject: Injector) {
    super(inject);
    this.productList = [];
    this.shipping = 0;
  }

  ngOnInit(): void {
    this.getObserveProducts();
  }
}
