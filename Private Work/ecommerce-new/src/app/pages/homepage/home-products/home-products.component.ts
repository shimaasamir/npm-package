import { Component, Input, OnInit } from '@angular/core';
import { Selling } from 'src/app/model/selling';

@Component({
  selector: 'app-home-products',
  templateUrl: './home-products.component.html',
  styleUrls: ['./home-products.component.scss']
})
export class HomeProductsComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('product')
  sellingList: Selling[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
