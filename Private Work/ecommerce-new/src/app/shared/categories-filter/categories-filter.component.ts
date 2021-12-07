import { Component, Input, OnInit } from '@angular/core';
import { Brand } from 'src/app/model/brand';
import { Category } from 'src/app/model/category';
import { LocalDataService } from 'src/app/services/LocalData.service';

@Component({
  selector: 'app-categories-filter',
  templateUrl: './categories-filter.component.html',
  styleUrls: ['./categories-filter.component.scss'],
})
export class CategoriesFilterComponent implements OnInit {
  public isCollapsed = true;
  @Input()
  filterType = '';

  @Input()
  title = '';

  categoryList: Category[] = [];
  brandList: Brand[] = [];

  constructor(private localDatService: LocalDataService) {
    this.filterType = 'categories';
    this.title = '';
  }

  ngOnInit(): void {
    this.localDatService.currentCategoryList.subscribe(
      (response) => (this.categoryList = response)
    );

    this.localDatService.currentBrandList.subscribe(
      (response) => (this.brandList = response)
    );
  }
}
