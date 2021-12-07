import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ObjectHasValue } from 'src/app/helper/helper';
import { Address } from 'src/app/model/address';
import { NameId } from 'src/app/model/name-id';
import { AddressService } from 'src/app/services/API/address/address.service';
import { AuthService } from 'src/app/services/API/auth.service';
import { CartBaseComponent } from 'src/app/shared/base/cart-base.component';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent extends CartBaseComponent implements OnInit {
  public pauseState = true;
  stateList: NameId[];
  addressList$: Observable<Address[]> = {} as Observable<Address[]>;
  address: Address;
  form: FormGroup;

  get payment_method(): FormControl {
    return this.form.get('payment_method') as FormControl;
  }

  get isLogin(): boolean {
    return this.authService.isLogin();
  }

  constructor(private addressService: AddressService, inject: Injector) {
    super(inject);
    this.stateList = [];
    this.address = new Address();
    this.form = new FormGroup({
      payment_method: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.getState();
    this.getAddress();

    // for handle any change in address list
    this.addressList$ = this.addressService.currentAddressList;
    this.getSelectedAddress();
  }

  onPausedClick(): void {
    this.pauseState = !this.pauseState;
  }

  onBackClick(event: boolean): void {
    this.pauseState = event;
  }

  isValid(): boolean {
    const paymentMethod = this.payment_method.value;
    return paymentMethod && paymentMethod > 0 && ObjectHasValue(this.address);
  }

  private getAddress(): void {
    this.addressService.getAddresses().subscribe({
      next: (response) => {
        if (response.status) {
          this.addressService.onAddressListChange(response.data);
        }
      },
    });
  }

  private getState(): void {
    this.addressService.getState().subscribe({
      next: (response) => {
        if (response.status) {
          this.stateList = response.data;
        }
      },
    });
  }

  private getSelectedAddress(): void {
    this.addressService.currentAddress.subscribe({
      next: this.selectedAddressfunc.bind(this),
    });
  }

  async selectedAddressfunc(address: Address): Promise<void> {
    this.address = address;
    if (ObjectHasValue(this.address)) {
      this.shipping = (await this.getShipping(address.id)).grand_total;
    }
  }

  applyCheckOut(): void {
    // if (this.isValid()) {
    this.userShoppingService
      .checkOut(this.payment_method.value, this.address.id)
      .subscribe((response) => console.log(response));
    // }
  }
}
