import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/model/category';
import { SubCategoryService } from 'src/app/services/API/sub-category/subCategory.service';
import { EncrDecrService } from 'src/app/services/encryption-decryption.service';

@Component({
  selector: 'app-sub-category-list',
  templateUrl: './sub-category-list.component.html',
  styleUrls: ['./sub-category-list.component.scss'],
})
export class SubCategoryListComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('CategoryId')
  categoryId = 0;

  // tslint:disable-next-line: no-input-rename
  @Input('DataSource')
  subCategoryList: Category[] = [];
  constructor(private encrDecrService: EncrDecrService) {}

  ngOnInit(): void {}

  getEcraptedId(subCategoryId: any): string {
    return this.encrDecrService.set(subCategoryId);
  }
}
