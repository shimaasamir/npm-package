import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AddressService } from 'src/app/services/API/address/address.service';
import { NameId } from 'src/app/model/name-id';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/model/address';
import { CountryEnum } from 'src/app/model/enums/countryEnum';
import { IErrorResponse } from 'src/app/model/error-response';
import { IUserResponse } from 'src/app/model/IUserResponse';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IResponse } from 'src/app/model/IResponse';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit {
  cityList: NameId[];
  error: IErrorResponse;
  form: FormGroup = new FormGroup({});
  showLoader: boolean;
  addressList$: Observable<Address[]> = {} as Observable<Address[]>;

  // tslint:disable-next-line: no-input-rename
  @Input('StateDataSource') sateList: NameId[];
  // tslint:disable-next-line: no-output-rename
  @Output('BackClick') BackClick: EventEmitter<boolean>;

  constructor(
    private addressService: AddressService,
    private snackBarService: SnackBarService
  ) {
    this.sateList = [];
    this.cityList = [];
    this.showLoader = false;
    this.form = new FormGroup({});
    this.error = {} as IErrorResponse;
    this.BackClick = new EventEmitter<boolean>();
    this.addressList$ = this.addressService.currentAddressList;
    this.createForm();
  }

  ngOnInit(): void {
    this.addressService
      .getState()
      // tslint:disable-next-line: deprecation
      .subscribe({ next: (response) => (this.sateList = response.data) });
  }

  onStateChange(id: number): void {
    this.addressService
      .getCity(id)
      // tslint:disable-next-line: deprecation
      .subscribe({ next: (response) => (this.cityList = response.data) });
  }

  back(): void {
    this.BackClick.emit(true);
  }

  getControl(controlName: string): FormControl {
    return this.form?.get(controlName) as FormControl;
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.showLoader = true;
      const address = this.setAddessObj();
      this.addressService.addAddress(address).subscribe({
        error: this.handleError.bind(this),
        next: this.handleResponse.bind(this),
      });
    }
  }

  private handleResponse(response: IResponse<Address> & IErrorResponse): void {
    if (response.status) {
      this.snackBarService.sucessMessage('Address added successfully');
      this.addAddress(response.data);
      this.BackClick.emit(true);
    } else {
      this.error = response;
      this.snackBarService.failMessage(response.message);
    }
    this.showLoader = false;
  }

  addAddress(address: Address): void {
    // tslint:disable-next-line: deprecation
    this.addressList$.pipe(take(1)).subscribe({
      next: (addressList) => {
        const datasourse = [...addressList, address];
        this.addressService.onAddressListChange(datasourse);
      },
    });
  }

  private handleError(error: any): void {
    console.log(error);
    this.snackBarService.failMessage(JSON.stringify(error));
    this.showLoader = false;
  }

  private setAddessObj(): Address {
    const address = new Address();
    address.address_line_1 = this.getControl('line1').value;
    address.address_line_2 = this.getControl('line2').value;
    address.address_title = this.getControl('title').value;
    address.state_id = +this.getControl('state').value;
    address.city_id = +this.getControl('city').value;
    address.building = +this.getControl('building').value;
    address.apartment_no = +this.getControl('apartment_no').value;
    address.floor = +this.getControl('floor').value;
    address.phone = this.getControl('phone').value;
    address.country_id = CountryEnum.egypt;
    address.address_type = 'Primary';
    return address;
  }

  private createForm(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      line1: new FormControl('', [Validators.required]),
      line2: new FormControl(''),
      building: new FormControl(''),
      apartment_no: new FormControl(''),
      floor: new FormControl(''),
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(11),
        Validators.pattern(/^01[0-2]{1}[0-9]{8}/),
      ]),
    });
  }
}
