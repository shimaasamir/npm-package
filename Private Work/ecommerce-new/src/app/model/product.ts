import { Cart, ProductCart } from './cart';
import { Category } from './category';
import { Feedback } from './feedback';

export class Product {
  id = 0;
  oem = '';
  mpn = '';
  sku = '';
  seller = '';
  name = '';
  slug = '';
  active = false;
  description = '';
  categories: Category[] = [];
  manufacturer = '';
  origin = '';
  featuredImage = '';
  image = '';
  quantity = 0;
  product_id = 0;
  shipping_free = false;
  stock_quantity = 0;
  sale_price = 0;
  offer_price = 0;
  offer_start = '';
  offer_end = '';
  past_price = 0;
  current_price = 0;
  average_feedback = 0;
  feedbacks: Feedback[] = [];
  count_feedback = 0;
  related: Product[] = [];
  linked_items: Product[] = [];
  cart?: Cart = new Cart();

  mapData(productCart: ProductCart): Product {
    return {
      id: productCart.id,
      oem: productCart.oem,
      mpn: productCart.mpn,
      sku: productCart.sku,
      name: productCart.name,
      slug: productCart.slug,
      featuredImage: productCart.featuredImage,
      image: productCart.image,
      stock_quantity: productCart.stock_quantity,
      quantity: productCart.cart.quantity,
      sale_price: productCart.cart.unit_price,
      cart: productCart.cart,
    } as Product;
  }
}
