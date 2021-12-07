import { Injectable } from '@angular/core';
import { Response } from 'src/app/model/api/response';
import { DataService } from '../Base/http.service';
import { HttpClient } from '@angular/common/http';
import { Model } from 'src/app/model/model';

@Injectable({
  providedIn: 'root'
})
export class ModelService extends DataService {

  private getModelByBrandIdUrl = '';
  private getModelYearsByModelIdUrl = '';
  constructor(http: HttpClient) {
    super(http);
    this.getModelByBrandIdUrl = this.url.Model.getByBrandId;
    this.getModelYearsByModelIdUrl = this.url.Model.getModelYearsByBrandId;
   }

   getModelsByBrandId(id: number) {
      const url = `${this.getModelByBrandIdUrl}/${id}`;
      return this.getById<Response<Model[]>>(url);
   }

   getModelYearByModelId(id: number) {
      const url = `${this.getModelYearsByModelIdUrl}/${id}`;
      return this.getById<Response<Model[]>>(url);
   }
}
