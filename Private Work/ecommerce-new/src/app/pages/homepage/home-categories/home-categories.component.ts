import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';

@Component({
  selector: 'app-home-categories',
  templateUrl: './home-categories.component.html',
  styleUrls: ['./home-categories.component.scss']
})
export class HomeCategoriesComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('category')
  categoryList: Category[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
