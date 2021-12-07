import { Component, OnInit } from '@angular/core';
import { EncrDecrService } from 'src/app/services/encryption-decryption.service';

@Component({
  selector: 'app-base',
  template: ``,
})
export class BaseComponent implements OnInit {
  constructor(private encrDecrService: EncrDecrService) {}

  ngOnInit(): void {}

  getEcraptedId(subCategoryId: any): string {
    return this.encrDecrService.set(subCategoryId);
  }

  getDecraptedId(subCategoryId: any): string {
    return this.encrDecrService.get(subCategoryId);
  }
}
