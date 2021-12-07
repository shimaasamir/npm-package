import { Injectable } from '@angular/core';
import { DataService } from '../Base/http.service';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/model/category';
import { Response } from 'src/app/model/api/response';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService extends DataService {
  private subCategoryUrl = '';
  constructor(http: HttpClient) {
    super(http);
    this.subCategoryUrl = this.url.SubCategory.getSubCategoryByCategoryId;
  }

  getAllByCategoryId(categoryId: number) {
    const url = `${this.subCategoryUrl}/${categoryId}`;
    return this.get<Response<Category[]>>(url);
  }
}
