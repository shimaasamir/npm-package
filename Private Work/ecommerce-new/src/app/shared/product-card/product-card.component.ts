import { Component, Injector, Input, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Route, Router } from '@angular/router';
import { EncrDecrService } from 'src/app/services/encryption-decryption.service';
import { CartBaseComponent } from '../base/cart-base.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent extends CartBaseComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('product')
  product: any;

  // tslint:disable-next-line: no-input-rename
  @Input('image')
  image = 'featuredImage';

  constructor(
    inject: Injector,
    private encrDecrService: EncrDecrService,
    private router: Router
  ) {
    super(inject);
  }

  ngOnInit(): void {}

  appendToCart(): void {
    this.addToCart(this.product, 1);
  }

  navigate(id: string): void {
    // tslint:disable-next-line: variable-name
    const en_id = this.encrDecrService.set(id);
    this.router.navigate(['/product', en_id]);
  }
}
