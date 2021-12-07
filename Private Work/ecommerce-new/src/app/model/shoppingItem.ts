import { CloneObject } from '../helper/helper';
import { Product } from './product';

export class ShoppingItem {
  private produtcs: Product[] = [];
  constructor(produtcs: Product[]) {
    this.produtcs = CloneObject(produtcs);
  }

  getTotalPrice(): number {
    let total = 0;
    this.produtcs.forEach((prod) => {
      if (prod.offer_price > 0) {
        total += prod.quantity * prod.offer_price;
      } else {
        total += prod.quantity * prod.sale_price;
      }
    });
    return total;
  }
}
