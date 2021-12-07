import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlgoliaResponse } from 'src/app/model/algolia-search';
import { Response } from 'src/app/model/api/response';
import { Home } from 'src/app/model/home';
import { environment } from 'src/environments/environment.prod';
import { DataService } from '../Base/http.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService extends DataService {
  private getAllUrl = '';
  private algoliaUrl: string;
  constructor(http: HttpClient) {
    super(http);
    this.getAllUrl = this.url.Home.getHomeData;
    this.algoliaUrl = `${environment.algoliaUrl}/search`;
  }

  getAll(): Observable<Response<Home>> {
    return this.get<Response<Home>>(this.getAllUrl);
  }

  homeSearch(
    keyWord: string,
    pageIndex: number = 1,
    pageSize: number = 20
  ): Observable<AlgoliaResponse> {
    const url = `${this.algoliaUrl}/?query_string=${keyWord}&page_number=${pageIndex}&page_size=${pageSize}`;
    return this.http.get<AlgoliaResponse>(url);
  }
}
