import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IErrorResponse } from 'src/app/model/error-response';
import { IUserResponse } from 'src/app/model/IUserResponse';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/API/auth.service';
import { SessionService } from 'src/app/services/LocalStorage/session.service';
import { MustMatch } from 'src/app/Validators/password.validators';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent implements OnInit {
  form = new FormGroup({});
  showLoader = false;
  error: IErrorResponse;

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get confirm(): FormControl {
    return this.form.get('confirm') as FormControl;
  }

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get phoneNumber(): FormControl {
    return this.form.get('phoneNumber') as FormControl;
  }

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.error = {} as IErrorResponse;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = new FormGroup(
      {
        email: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirm: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        name: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl('', [
          Validators.required,
          Validators.maxLength(11),
          Validators.pattern(/^01[0-2]{1}[0-9]{8}/),
        ]),
      },
      {
        validators: MustMatch('password', 'confirm'),
      }
    );
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.showLoader = true;
      const user = this.setUserObj();
      // start to register
      this.authService.Register(user).subscribe(
        (response: IUserResponse & IErrorResponse) => {
          if (response.status) {
            this.setUserDataInLocalStorage(response);
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

  private setUserDataInLocalStorage(
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
    const user = new User();
    user.email = this.email.value;
    user.name = this.name.value;
    user.password = this.password.value;
    user.phone_number = this.phoneNumber.value;
    return user;
  }
}
