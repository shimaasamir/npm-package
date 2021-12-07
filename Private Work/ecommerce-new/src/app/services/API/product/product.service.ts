import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilterProduct } from 'src/app/model/filterProduct';
import { Response } from 'src/app/model/api/response';
import { DataService } from '../Base/http.service';
import { Product } from 'src/app/model/product';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { TireProduct } from 'src/app/model/tireProduct';
import { OilProduct } from 'src/app/model/oilProduct';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends DataService {
  private productByCategoryIdUrl = '';
  private tireProductsUrl = '';
  private oilProductsUrl = '';
  private productById = '';

  constructor(Http: HttpClient) {
    super(Http);
    this.productByCategoryIdUrl = this.url.Product.getProductByCategoryId;
    this.tireProductsUrl = this.url.Product.tireproducts;
    this.oilProductsUrl = this.url.Product.oilproducts;
    this.productById = this.url.Product.getProductById;
  }

  getProductByCategoryId(
    categoryId: number
  ): Observable<Response<FilterProduct>> {
    const url = `${this.productByCategoryIdUrl}/${categoryId}`;
    return this.get<Response<FilterProduct>>(url);
  }

  getProductByTireCategory(
    categoryId: number
  ): Observable<Response<TireProduct>> {
    const url = `${this.tireProductsUrl}/${categoryId}`;
    return this.get<Response<TireProduct>>(url);
  }

  getProductByOilCategoryId(
    categoryId: number
  ): Observable<Response<OilProduct>> {
    const url = `${this.oilProductsUrl}/${categoryId}`;
    return this.get<Response<OilProduct>>(url);
  }

  getProductById(id: number): Observable<Response<Product>> {
    const url = `${this.productById}/${id}`;
    return this.get<Response<Product>>(url);
  }
}
