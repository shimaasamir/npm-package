import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { SessionService } from '../LocalStorage/session.service';
import { DataService } from './Base/http.service';
import jwt_decode from 'jwt-decode';
import { ObjectHasValue } from 'src/app/helper/helper';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends DataService {
  private isLoggedSource = new BehaviorSubject<boolean>(false);
  currentLoggedIn = this.isLoggedSource.asObservable();

  private loginUrl = '';
  private registerUrl = '';
  urls = [
    'cart',
    'vehicle',
    'address',
    'profile',
    'details',
    'password',
    'shippingcost',
    // 'checkout',
  ];

  constructor(http: HttpClient, private sessionService: SessionService) {
    super(http);
    this.loginUrl = this.url.user.login;
    this.registerUrl = this.url.user.register;
    this.changeLoginValue();
  }

  public Login(user: User): Observable<any> {
    return this.post<any>(this.loginUrl, user);
  }

  public Register(user: User): Observable<any> {
    return this.post<any>(this.registerUrl, user);
  }

  public isLogin(): boolean {
    const token = this.sessionService.getToken();
    if (token) {
      return this.validToken(token);
    }

    return false;
  }

  public changeLoginValue(): void {
    const isLogin = this.isLogin();
    this.isLoggedSource.next(isLogin);
  }

  public logOut(): void {
    this.sessionService.clearAll();
    this.isLoggedSource.next(false);
  }

  public isAuthenticatedUrl(fullurl: string): boolean {
    return this.urls.some((method) => fullurl.indexOf(method) > -1);
  }

  private validToken(token: string): boolean {
    const obj = jwt_decode(token);
    return ObjectHasValue(obj);
  }
}
