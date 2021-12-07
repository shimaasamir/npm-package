import { Component, Injector, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Product } from 'src/app/model/product';
import { CartBaseComponent } from 'src/app/shared/base/cart-base.component';
@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.scss'],
  animations: [
    trigger('editProd', [
      state(
        'initial',
        style({
          right: '0',
        })
      ),
      state(
        'final',
        style({
          right: '250px',
        })
      ),
      transition('initial=>final', animate('1500ms')),
      transition('final=>initial', animate('1000ms')),
    ]),
  ],
})
export class CartProductComponent extends CartBaseComponent implements OnInit {
  @Input()
  imagePath: string;

  // tslint:disable-next-line: no-input-rename
  @Input('product')
  product: Product = {} as Product;

  isEdit = false;
  constructor(inject: Injector) {
    super(inject);
    this.imagePath = '../../../../assets/icons/cartprodimage@2x.png';
  }

  ngOnInit(): void {}

  editProduct(): void {
    this.isEdit = !this.isEdit;
  }

  fakeArray(length: number): Array<any> {
    if (length >= 0) {
      return new Array(length);
    }
    return [];
  }

  selectQuantity(event: any): void {
    const qty = event.target.value;
    this.addToCart(this.product, qty);
  }

  removeProduct(): void {
    this.removeFromCart(this.product);
  }
}
