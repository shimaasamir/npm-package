import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '../Base/http.service';
import { Response } from 'src/app/model/api/response';
import { NameId } from 'src/app/model/name-id';
import { BehaviorSubject, Observable } from 'rxjs';
import { Address } from 'src/app/model/address';

@Injectable({
  providedIn: 'root',
})
export class AddressService extends DataService {
  private stateUrl: string;
  private ciryUrl: string;
  private addressurl: string;

  private addressItem = new BehaviorSubject<Address>({} as Address);
  currentAddress = this.addressItem.asObservable();

  private addressListItem = new BehaviorSubject<Address[]>([]);
  currentAddressList = this.addressListItem.asObservable();

  constructor(http: HttpClient) {
    super(http);
    this.stateUrl = this.url.address.state;
    this.ciryUrl = this.url.address.city;
    this.addressurl = this.url.address.address;
  }

  getState(): Observable<Response<NameId[]>> {
    return this.get<Response<NameId[]>>(this.stateUrl);
  }

  getCity(stateId: number): Observable<Response<NameId[]>> {
    const fullUrl = `${this.ciryUrl}/${stateId}`;
    return this.get<Response<NameId[]>>(fullUrl);
  }

  addAddress(address: Address): Observable<any> {
    return this.post<any>(this.addressurl, address);
  }

  getAddresses(): Observable<Response<Address[]>> {
    return this.get<Response<Address[]>>(this.addressurl);
  }

  onAddressChange(address: Address): void {
    this.addressItem.next(address);
  }

  onAddressListChange(address: Address[]): void {
    this.addressListItem.next(address);
  }
}
