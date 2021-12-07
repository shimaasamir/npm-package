import { Component, Injector, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { CartBaseComponent } from 'src/app/shared/base/cart-base.component';

@Component({
  selector: 'app-order-product-item',
  templateUrl: './order-product-item.component.html',
  styleUrls: ['./order-product-item.component.scss'],
})
export class OrderProductItemComponent
  extends CartBaseComponent
  implements OnInit {
  @Input() product: Product;

  constructor(inject: Injector) {
    super(inject);
    this.product = new Product();
  }

  ngOnInit(): void {}

  removeProduct(): void {
    this.removeFromCart(this.product);
  }
}
