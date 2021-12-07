import { Injectable } from '@angular/core';
import { DataService } from '../Base/http.service';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/model/category';
import { Response } from 'src/app/model/api/response';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends DataService {
  private getAllUrl = '';
  constructor(http: HttpClient) {
    super(http);
    this.getAllUrl = this.url.Category.getAll;
  }

  getAll() {
    return this.get<Response<Category[]>>(this.getAllUrl);
  }
}
