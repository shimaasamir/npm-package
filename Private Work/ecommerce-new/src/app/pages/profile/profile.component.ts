import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { IErrorResponse } from 'src/app/model/error-response';
import { IUserDetails } from 'src/app/model/IUserDetails';
import { Password } from 'src/app/model/password';
import { User } from 'src/app/model/user';
import { UserDetails } from 'src/app/model/user-details';
import { UserService } from 'src/app/services/API/user/user.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { MustMatch } from 'src/app/Validators/password.validators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  isEdit = false;
  closeResult = '';
  subscribtion: Subscription = {} as Subscription;
  userName = '';
  form = new FormGroup({});
  passwordForm = new FormGroup({});
  showLoader = false;
  error: IErrorResponse;
  passwordError: IErrorResponse;
  imagePath = '';
  // userDetails: UserDetails;

  // for user profile
  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }
  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get phoneNumber(): FormControl {
    return this.form.get('phone_number') as FormControl;
  }

  // for password form-group
  get oldPassword(): FormControl {
    return this.passwordForm.get('oldPassword') as FormControl;
  }
  get newPassword(): FormControl {
    return this.passwordForm.get('newPassword') as FormControl;
  }
  get confirm(): FormControl {
    return this.passwordForm.get('confirm') as FormControl;
  }

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private snakbarService: SnackBarService
  ) {
    this.error = {} as IErrorResponse;
    this.passwordError = {} as IErrorResponse;
  }

  ngOnInit(): void {
    this.createForm();
    this.createPasswordForm();
    this.subscribtion = this.userService.getUserDetails().subscribe({
      next: this.getUserData.bind(this),
    });
  }

  edit(): void {
    this.isEdit = true;
  }

  save(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.showLoader = true;
      const user = this.form.value as User;
      // start to register
      this.userService.saveUserProfile(user).subscribe({
        next: this.saveUserOnSucess.bind(this),
        error: this.saveUserOnFail.bind(this),
      });
    }
  }

  saveUserOnSucess(response: IUserDetails & IErrorResponse): void {
    if (response.status) {
      this.saveUserOnFail(response.data);
      this.error = {} as IErrorResponse;
      this.snakbarService.sucessMessage('Data saved successfully');
    } else {
      this.error = response;
      this.snakbarService.failMessage(response.message);
    }
    this.showLoader = false;
    this.isEdit = false;
  }

  saveUserOnFail(error: any): void {
    console.log(error);
    this.showLoader = false;
    this.snakbarService.failMessage('Failed to save data');
  }

  open(content: any): void {
    this.modalService.open(content, { size: 'sm' });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnDestroy(): void {
    if (this.subscribtion) {
      this.subscribtion.unsubscribe();
    }
  }

  getUserData(response: UserDetails): void {
    // this.userDetails = response;
    this.setFormDate(response);
  }

  createForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
      ]),
      name: new FormControl('', [Validators.required]),
      imagePath: new FormControl(''),
      phone_number: new FormControl('', [
        Validators.required,
        Validators.maxLength(11),
        Validators.pattern(/^01[0-2]{1}[0-9]{8}/),
      ]),
    });
  }

  createPasswordForm(): void {
    this.passwordForm = new FormGroup(
      {
        oldPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        newPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirm: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      {
        validators: MustMatch('newPassword', 'confirm'),
      }
    );
  }

  setFormDate(response: UserDetails): void {
    this.email.setValue(response.user.email);
    this.name.setValue(response.user.name);
    this.userName = response.user.name;
    this.phoneNumber.setValue(response.user.phone_number);
    this.imagePath = response.user.image;
  }

  changePassword(content: any): void {
    if (this.passwordForm.valid) {
      const password = this.getPasswordObj();
      // tslint:disable-next-line: deprecation
      this.userService.changePassword(password).subscribe({
        next: (response: IErrorResponse) => {
          if (response.status) {
            this.passwordError = {} as IErrorResponse;
            this.modalService.dismissAll(content);
            this.snakbarService.sucessMessage('Data saved successfully');
          } else {
            this.passwordError = response;
            this.snakbarService.failMessage(response.message);
          }
        },
        error: this.changePasswordOnFail.bind(this),
      });
    }
  }

  private getPasswordObj(): Password {
    const password = new Password();
    password.current_password = this.oldPassword.value;
    password.password = this.newPassword.value;
    password.password_confirmation = this.confirm.value;
    return password;
  }

  changePasswordOnFail(error: any): void {
    console.log(error);
  }
}
