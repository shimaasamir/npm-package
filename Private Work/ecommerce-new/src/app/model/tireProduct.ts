import { Product } from './product';
import { Tires } from './tires';

export class TireProduct {
  tires: Tires = {} as Tires;
  hot_items: Product[] = [];
  offer_for_you: Product[] = [];
}
