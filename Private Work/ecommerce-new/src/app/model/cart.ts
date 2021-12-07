export class Cart {
  cart_id = 0;
  quantity = 0;
  unit_price = 0;
}

export class CartItem {
  product_id = 0;
  quantity = 0;
}

export class CartResponse {
  total = 0;
  carts: CartsDetails[] = [];
}

export class CartsDetails {
  items: ProductCart[] = [];
}

export class ProductCart {
  id = 0;
  oem = '';
  mpn = '';
  sku = '';
  name = '';
  slug = '';
  featuredImage = '';
  image = '';
  stock_quantity = 0;
  cart: Cart = {} as Cart;
}

/**
 *  cart => cart id
 *  item => product id
 */
export class UpdateCart {
  'cart' = 0;
  'item' = 0;
}
