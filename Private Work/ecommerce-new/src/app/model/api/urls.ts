export class Urls {
  private controller = 'api/customer/';

  brand = {
    getAll: `${this.controller}brands`,
  };

  Category = {
    getAll: `${this.controller}categories`,
  };

  SubCategory = {
    getSubCategoryByCategoryId: `${this.controller}sub-categories`,
  };

  Model = {
    getByBrandId: `${this.controller}models`,
    getModelYearsByBrandId: `${this.controller}models-years`,
  };

  Home = {
    getHomeData: `${this.controller}home`,
  };

  Product = {
    getProductById: `${this.controller}product`,
    getProductByCategoryId: `${this.controller}products-by-category`,
    oilproducts: `${this.controller}oilproducts-by-category`,
    tireproducts: `${this.controller}tireproducts-by-category`,
  };

  Vehicle = {
    AddVehicle: `${this.controller}vehicle`,
  };

  cart = {
    CartUrl: `${this.controller}cart`,
    ShippingcostUrl: `${this.controller}shippingcost`,
    CheckOutUrl: `${this.controller}checkout`,
  };

  user = {
    login: `${this.controller}login`,
    register: `${this.controller}register`,
    profile: `${this.controller}profile`,
    details: `${this.controller}details`,
    password: `${this.controller}password`,
  };

  address = {
    address: `${this.controller}address`,
    state: `${this.controller}state-address`,
    city: `${this.controller}city-address`,
  };
}
