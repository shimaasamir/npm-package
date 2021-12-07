import { Category } from './category';

export class Selling {
  id = 0;
  oem = null;
  mpn = null;
  sku = '';
  seller = '';
  name = '';
  slug = '';
  active = true;
  description = '';
  product_id = 0;
  stock_quantity = 0;
  sale_price = 0;
  offer_price = 0;
  offer_start = new Date();
  offer_end = new Date();
  manufacturer = null;
  origin = null;
  featuredImage = '';
  image = '';
  categories: Category[] = [];
  related: Selling[] = [];
}
