import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IErrorResponse } from 'src/app/model/error-response';
import { User } from 'src/app/model/user';
import { IUserResponse } from 'src/app/model/IUserResponse';
import { AuthService } from 'src/app/services/API/auth.service';
import { SessionService } from 'src/app/services/LocalStorage/session.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  form = {} as FormGroup;
  showLoader = false;
  error: IErrorResponse;
  returnedUrl = '';
  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.error = {} as IErrorResponse;
  }

  ngOnInit(): void {
    this.createForm();
    this.setReturnedUrl();
  }

  createForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.showLoader = true;
      const user = this.setUserObj();
      this.authService.Login(user).subscribe(
        (response: IUserResponse & IErrorResponse) => {
          if (response.status) {
            this.setUerDatainLocalStorage(response);
            this.authService.changeLoginValue();
            const url = this.getReturnUrl();
            this.router.navigateByUrl(url);
          } else {
            this.error = response;
          }
          this.showLoader = false;
        },
        (error) => {
          console.log(error);
          this.showLoader = false;
        }
      );
    }
  }

  private setUerDatainLocalStorage(
    response: IUserResponse & IErrorResponse
  ): void {
    this.sessionService.setToken(response.token);
    this.sessionService.setName(response.name);
  }

  private getReturnUrl(): string {
    const url = this.sessionService.getReturnedUrl();
    this.sessionService.clearReturnedUrl();
    return url;
  }

  private setUserObj(): User {
    const user = {} as User;
    user.email = this.email?.value;
    user.password = this.password?.value;
    return user;
  }

  private setReturnedUrl(): void {
    const url = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.sessionService.setReturnedUrl(url);
  }
}
