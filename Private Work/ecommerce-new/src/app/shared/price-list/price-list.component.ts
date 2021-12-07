import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss'],
})
export class PriceListComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('title')
  title = '';

  // tslint:disable-next-line: no-input-rename
  @Input('form')
  form: FormGroup = {} as FormGroup;

  // tslint:disable-next-line: no-output-rename
  @Output('filterProduct')
  filterProductByPrice = new EventEmitter();

  isCollapsed = true;
  constructor() {}

  ngOnInit(): void {}

  filterProduct() {
    this.filterProductByPrice.emit();
  }
}
