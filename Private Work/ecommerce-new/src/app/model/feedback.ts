export class Feedback {
  'customer_id': number;
  'rating': number;
  'comment': string;
  'crated_at': any;

  constructor() {
    this.customer_id = 0;
    this.rating = 0;
    this.comment = '';
    this.crated_at = null;
  }
}
