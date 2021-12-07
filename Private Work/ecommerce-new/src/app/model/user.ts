export class User {
  name: string;
  email: string;
  password: string;
  // tslint:disable-next-line: variable-name
  phone_number?: string;

  constructor() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.phone_number = '';
  }
}
