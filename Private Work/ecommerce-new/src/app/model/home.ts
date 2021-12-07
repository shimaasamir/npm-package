import { Category } from './category';
import { Selling } from './selling';

export class Home {
  cart_sum = 0;
  top_categories: Category[] = [];
  most_selling: Selling[] = [];
}
