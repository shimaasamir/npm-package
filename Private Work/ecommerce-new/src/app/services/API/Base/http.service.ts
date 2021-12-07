import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionParam } from 'src/app/model/api/actionParam';
import { Urls } from 'src/app/model/api/urls';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export abstract class DataService {
  // incase the url need to call from json file in asset folder
  // protected domain = AppConfig.settings.apiServer;
  protected domain = environment.url;
  protected url: Urls;
  constructor(public http: HttpClient) {
    this.url = new Urls();
  }

  protected get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.domain}/${url}`);
  }

  protected getById<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.domain}/${url}`);
  }

  protected post<T>(url: string, item: T): Observable<any> {
    return this.http.post(`${this.domain}/${url}`, item);
  }

  protected put<T>(url: string, item: any): Observable<T> {
    return this.http.put<T>(`${this.domain}/${url}`, item);
  }

  protected delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.domain}/${url}`);
  }

  protected getByParam(url: string, params: ActionParam[]): Observable<any> {
    if (params.length > 0) {
      url += '?';
      for (let index = 0; index < params.length; index++) {
        if (index > 0) {
          url += '&';
        }
        url += params[index].paramName + '=' + params[index].paramValue;
      }
    }
    return this.get(url);
  }
}
