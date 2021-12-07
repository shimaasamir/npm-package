import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { IsNullOrEmptyString } from '../helper/helper';

@Injectable({
  providedIn: 'root',
})
export class EncrDecrService {
  private readonly key = 'Odiggo#2021!@#$$';
  constructor() {}

  set(value: string): string {
    if (!IsNullOrEmptyString(value)) {
      const key = this.getUtf8Key();
      const valueUtf8 = this.convertToUtf8(value);
      return CryptoJS.AES.encrypt(
        valueUtf8,
        key,
        this.CryptoOption()
      ).toString();
    }

    return value;
  }

  get(value: string): string {
    if (!IsNullOrEmptyString(value)) {
      const key = this.getUtf8Key();
      const val = CryptoJS.AES.decrypt(value, key, this.CryptoOption());
      return val.toString(CryptoJS.enc.Utf8);
    }
    return value;
  }

  private getUtf8Key(): CryptoJS.lib.WordArray {
    return this.convertToUtf8(this.key);
  }

  private convertToUtf8(value: string): CryptoJS.lib.WordArray {
    return CryptoJS.enc.Utf8.parse(value);
  }

  CryptoOption(): any {
    const iv = this.getUtf8Key();
    return {
      keySize: 128 / 8,
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    };
  }
}
