import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Address } from 'src/app/model/address';
import { NameId } from 'src/app/model/name-id';

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.scss'],
})
export class AddressListComponent implements OnInit {
  @Output() newAddress = new EventEmitter<boolean>();

  // tslint:disable-next-line: no-input-rename
  @Input('DataSource') addressList: Address[] | null;

  // tslint:disable-next-line: no-input-rename
  @Input('StateDataSource') stateList: NameId[];

  constructor() {
    this.stateList = [];
    this.addressList = [];
  }

  ngOnInit(): void {}

  addNewAddress(): void {
    this.newAddress.emit(true);
  }
}
