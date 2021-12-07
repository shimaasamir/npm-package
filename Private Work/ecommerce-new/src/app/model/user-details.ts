export class UserDetails {
  user: UserObj;

  constructor() {
    this.user = {} as UserObj;
  }
}

class UserObj {
  id: number;
  name: string;
  email: string;
  dob: string;
  sex: any;
  description: string;
  active: boolean;
  image: string;
  nice_name: string;
  phone_number: string;
  group_id?: number | null;

  constructor() {
    this.id = 0;
    this.name = '';
    this.nice_name = '';
    this.email = '';
    this.dob = '';
    this.sex = null;
    this.description = '';
    this.active = false;
    this.group_id = null;
    this.image = '';
    this.phone_number = '';
  }
}
