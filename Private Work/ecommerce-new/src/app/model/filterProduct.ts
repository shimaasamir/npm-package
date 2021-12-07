import { Product } from './product';
import { Selection } from './selection';

export class FilterProduct {
  tires = [];
  selections: Selection = {} as Selection;
  products: Product[] = [];
}
