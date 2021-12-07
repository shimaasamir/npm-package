import { Injectable } from '@angular/core';
import { Brand } from 'src/app/model/brand';
import { DataService } from '../Base/http.service';
import { Response } from 'src/app/model/api/response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BrandService extends DataService {
  private getAllUrl = '';
  constructor(http: HttpClient) {
    super(http);
    this.getAllUrl = this.url.brand.getAll;
  }

  getAll() {
    return this.get<Response<Brand[]>>(this.getAllUrl);
  }
}
