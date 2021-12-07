import { Component, Input, OnInit } from '@angular/core';
import { NameId } from 'src/app/model/name-id';
import { AddressService } from 'src/app/services/API/address/address.service';
import { AuthService } from 'src/app/services/API/auth.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss'],
})
export class CheckoutFormComponent implements OnInit {
  showLoader = false;

  // tslint:disable-next-line: no-input-rename
  @Input('StateDataSource') sateList: NameId[] = [];
  cityList: NameId[] = [];

  constructor(
    private addressService: AddressService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {}

  onStateChange(id: number): void {
    this.addressService
      .getCity(id)
      // tslint:disable-next-line: deprecation
      .subscribe({ next: (response) => (this.cityList = response.data) });
  }
}
