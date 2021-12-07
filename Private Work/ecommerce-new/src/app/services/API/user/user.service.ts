import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Password } from 'src/app/model/password';
import { User } from 'src/app/model/user';
import { UserDetails } from 'src/app/model/user-details';
import { DataService } from '../Base/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends DataService {
  private isLoggedSource = new BehaviorSubject<boolean>(false);
  currentLoggedIn = this.isLoggedSource.asObservable();

  private userDetails = '';
  private userProfile = '';
  private userPassword = '';

  constructor(http: HttpClient) {
    super(http);
    this.userDetails = this.url.user.details;
    this.userProfile = this.url.user.profile;
    this.userPassword = this.url.user.password;
  }

  public getUserDetails(): Observable<UserDetails> {
    return this.get(this.userDetails);
  }

  public saveUserProfile(user: User): Observable<any> {
    return this.post(this.userProfile, user);
  }

  public changePassword(pasword: Password): Observable<any> {
    return this.post(this.userPassword, pasword);
  }
}
