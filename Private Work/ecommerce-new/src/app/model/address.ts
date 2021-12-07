export class Address {
  address_type: string;
  address_title: string;
  country_id: number;
  city_id: number;
  state_id: number;
  address_line_1: string;
  address_line_2: string;
  phone: string;
  building: number;
  apartment_no: number;
  floor: number;
  id: number;
  constructor() {
    this.address_type = '';
    this.address_title = '';
    this.country_id = 0;
    this.city_id = 0;
    this.state_id = 0;
    this.address_line_1 = '';
    this.address_line_2 = '';
    this.phone = '';
    this.building = 0;
    this.apartment_no = 0;
    this.floor = 0;
    this.id = 0;
  }
}
