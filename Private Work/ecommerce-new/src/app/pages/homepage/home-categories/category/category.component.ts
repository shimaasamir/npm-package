import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { EncrDecrService } from 'src/app/services/encryption-decryption.service';
import { BaseComponent } from 'src/app/shared/base/base.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent extends BaseComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('category')
  category: Category = {} as Category;

  constructor(encrDecrService: EncrDecrService) {
    super(encrDecrService);
  }

  ngOnInit(): void {}
}
