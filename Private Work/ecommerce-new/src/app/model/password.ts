export class Password {
  password: string;
  current_password: string;
  password_confirmation: string;

  constructor() {
    this.current_password = '';
    this.password = '';
    this.password_confirmation = '';
  }
}
