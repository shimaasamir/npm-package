export class Shippingcost {
  discount: number;
  shipping: number;
  // tslint:disable-next-line: variable-name
  sub_total: number;
  // tslint:disable-next-line: variable-name
  grand_total: number;

  constructor() {
    this.discount = 0;
    this.sub_total = 18224;
    this.grand_total = 18224;
    this.shipping = 0;
  }
}
