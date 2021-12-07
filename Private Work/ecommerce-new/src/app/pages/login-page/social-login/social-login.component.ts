import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ObjectHasValue } from 'src/app/helper/helper';
import { IErrorResponse } from 'src/app/model/error-response';
import { IUserResponse } from 'src/app/model/IUserResponse';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/API/auth.service';
import { SessionService } from 'src/app/services/LocalStorage/session.service';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss'],
})
export class SocialLoginComponent implements OnInit {
  @Input() navigationPath: string;
  @Input() alterText: string;
  @Input() buttonText: string;
  @Input() form: FormGroup = new FormGroup({});
  showLoader = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router
  ) {
    this.navigationPath = '';
    this.alterText = '';
    this.buttonText = '';
  }

  ngOnInit(): void {}

  register(): void {
    if (this.form && ObjectHasValue(this.form.controls)) {
      this.form.markAllAsTouched();
      this.showLoader = true;
      if (this.form.valid) {
        this.errorMessage = '';
        const user = {} as User;
        user.email = this.form.get('email')?.value;
        user.password = this.form.get('password')?.value;
        user.name = this.form.get('name')?.value;
        this.authService.Login(user).subscribe(
          (response: IUserResponse & IErrorResponse) => {
            if (response.status) {
              this.sessionService.setToken(response.token);
              this.sessionService.setName(response.name);
              this.authService.changeLoginValue();
              this.router.navigate(['./']);
            } else {
              this.errorMessage = response.message;
            }
            this.showLoader = false;
          },
          (error) => {
            console.log(error);
            this.showLoader = true;
          }
        );
      }
    }
  }
}
