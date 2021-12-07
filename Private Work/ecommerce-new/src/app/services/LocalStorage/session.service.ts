import { Injectable } from '@angular/core';
import { IsNullOrEmptyString } from '../../helper/helper';
import { EncrDecrService } from '../encryption-decryption.service';

/** This service for handling local-storage variable
 * as encrapted and decrpted
 */
@Injectable({
  providedIn: 'root',
})
export class SessionService {
  // tslint:disable-next-line: variable-name
  private readonly _token = 'to___k';

  // tslint:disable-next-line: variable-name
  private readonly _userName = 'to___n';
  // tslint:disable-next-line: variable-name
  private readonly _products = 'p___k';

  private readonly _returnedUrl = 'p___u';

  constructor(private encrDecrService: EncrDecrService) {}

  setToken(value: string): void {
    this.setValue(this._token, value);
  }

  getToken(): string {
    return this.getValue(this._token);
  }

  setReturnedUrl(value: string): void {
    this.setValue(this._returnedUrl, value);
  }

  getReturnedUrl(): string {
    return this.getValue(this._returnedUrl);
  }

  clearReturnedUrl(): void {
    localStorage.removeItem(this._returnedUrl);
  }

  setName(value: string): void {
    this.setValue(this._userName, value);
  }

  getName(): string {
    return this.getValue(this._userName);
  }

  setProducts(value: string): void {
    this.setValue(this._products, value);
  }

  getProducts(): string {
    return this.getValue(this._products);
  }

  clearProducts(): void {
    localStorage.removeItem(this._products);
  }

  clearAll(): void {
    localStorage.clear();
  }

  private setValue(key: string, value: string): void {
    switch (key) {
      case this._token:
        this.setlocalValue(this._token, value);
        break;
      case this._userName:
        this.setlocalValue(this._userName, value);
        break;
      case this._products:
        this.setlocalValue(this._products, value);
        break;
      case this._returnedUrl:
        this.setlocalValue(this._returnedUrl, value);
        break;

      default:
        break;
    }
  }

  private setlocalValue(key: string, value: string): void {
    if (!IsNullOrEmptyString(value)) {
      const encrpty = this.encrDecrService.set(value);
      localStorage.setItem(key, encrpty);
    }
  }

  private getValue(key: string): string {
    const val = localStorage.getItem(key);
    if (val && !IsNullOrEmptyString(val)) {
      return this.encrDecrService.get(val);
    }

    return '';
  }
}
