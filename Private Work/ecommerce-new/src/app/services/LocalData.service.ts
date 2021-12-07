import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Brand } from '../model/brand';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root',
})
export class LocalDataService {
  private categoryItemSource = new BehaviorSubject<Category[]>([]);
  private brandItemSource = new BehaviorSubject<Brand[]>([]);

  currentCategoryList = this.categoryItemSource.asObservable();
  currentBrandList = this.brandItemSource.asObservable();

  constructor() {}

  changeCurrentCategoryList(categoryList: Category[]): void {
    this.categoryItemSource.next(categoryList);
  }

  changeCurrentBrandList(brandList: Brand[]): void {
    this.brandItemSource.next(brandList);
  }
}
