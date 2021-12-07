import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartBaseComponent } from 'src/app/shared/base/cart-base.component';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent extends CartBaseComponent implements OnInit {
  constructor(inject: Injector, private router: Router) {
    super(inject);
  }

  ngOnInit(): void {
    this.getObserveProducts();
  }

  redirectToCheckout(): void {
    this.router.navigate(['./checkout']);
  }

  redirectToHome(): void {
    this.router.navigate(['./']);
  }

  selectQuantity(qty: number): void {}
}
