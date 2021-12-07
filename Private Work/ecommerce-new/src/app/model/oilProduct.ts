import { Oil } from './oil';
import { Product } from './product';
import { Selection } from './selection';

export class OilProduct {
  oil: Oil = {} as Oil;
  selections: Selection = {} as Selection;
  products: Product[] = [];
}
