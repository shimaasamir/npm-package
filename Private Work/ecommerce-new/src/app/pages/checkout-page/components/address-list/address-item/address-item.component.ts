import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Address } from 'src/app/model/address';
import { NameId } from 'src/app/model/name-id';
import { AddressService } from 'src/app/services/API/address/address.service';

@Component({
  selector: 'app-address-item',
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.scss'],
})
export class AddressItemComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('Address') address: Address;

  selectedAddress$: Observable<Address>;

  // tslint:disable-next-line: no-input-rename
  @Input('StateDataSource') stateList: NameId[];

  stateName: string | undefined;

  constructor(private addressService: AddressService) {
    this.stateName = '';
    this.stateList = [];
    this.address = new Address();
    this.selectedAddress$ = this.addressService.currentAddress;
  }

  ngOnInit(): void {
    this.stateName = this.stateList.find(
      (state) => state.id == this.address.state_id
    )?.name;
  }

  updateSelectedAddress(): void {
    this.addressService.onAddressChange(this.address);
  }
}
