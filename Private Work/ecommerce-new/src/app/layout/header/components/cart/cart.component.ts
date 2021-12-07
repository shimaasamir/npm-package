import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { ShoppingCartService } from 'src/app/services/API/ShoppingCart/ShoppingCart.service';
import { UserShoppingCartService } from 'src/app/services/API/ShoppingCart/UserShoppingCart.service';
import { AuthService } from 'src/app/services/API/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  length = 0;
  constructor(
    private shoppingCartService: ShoppingCartService,
    private userShoppingCartService: UserShoppingCartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.shoppingCartService.currentProductList.subscribe((products) => {
      this.length = products.length;
    });

    this.getProducts();
  }

  getProducts(): void {
    const productList: Product[] = [];
    if (this.authService.isLogin()) {
      this.userShoppingCartService.getFromCart().subscribe((reponse) => {
        if (reponse && reponse.data) {
          reponse.data.carts.forEach((cartDetails) => {
            productList.push(
              ...cartDetails.items.map((product) =>
                new Product().mapData(product)
              )
            );
          });

          this.shoppingCartService.setProducts(productList);
        }
      });
    } else {
      this.shoppingCartService.getProductsBeforeLogin();
    }
  }
}
