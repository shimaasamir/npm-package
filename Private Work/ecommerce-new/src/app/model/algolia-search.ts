export class AlgoliaResponse {
  count: number;
  pageNumber: number;
  pageSize: number;
  list: AlgoliaProduct[];

  constructor() {
    this.count = 0;
    this.pageNumber = 0;
    this.pageSize = 0;
    this.list = [];
  }
}

export class AlgoliaProduct {
  sku: string;
  mpn: string;
  name: string;
  // tslint:disable-next-line: variable-name
  name_other: string;
  stock_quantity: number;
  sale_price: string;
  offer_price: string;
  offer_active: boolean;
  offer_end: Date | null;
  shipping_weight: string;
  free_shipping: boolean;
  description: string;
  description_other: string;
  parent_category_id: string;
  category_id: string;
  category_name_other: string;
  category_name: string;
  manufacturer: string;
  vendor: any;
  country: string;
  country_other: string;
  dynamic_attributes: any;
  fitment: any;
  url_en: string;
  url_ar: string;
  image: string;
  objectID: string;

  constructor() {
    this.sku = '';
    this.mpn = '';
    this.name = '';
    this.name_other = '';
    this.stock_quantity = 0;
    this.sale_price = '';
    this.offer_price = '';
    this.offer_active = false;
    this.offer_end = null;
    this.shipping_weight = '';
    this.free_shipping = false;
    this.description = '';
    this.description_other = '';
    this.parent_category_id = '';
    this.category_id = '';
    this.category_name_other = '';
    this.category_name = '';
    this.manufacturer = '';
    this.vendor = null;
    this.country = '';
    this.country_other = '';
    this.dynamic_attributes = '';
    this.fitment = '';
    this.url_en = '';
    this.url_ar = '';
    this.image = '';
    this.objectID = '';
  }
}
