import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from 'src/app/model/api/response';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/API/product/product.service';
import { EncrDecrService } from 'src/app/services/encryption-decryption.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';
import { CartBaseComponent } from 'src/app/shared/base/cart-base.component';
import { ObjectHasValue } from 'src/app/helper/helper';
import { Feedback } from 'src/app/model/feedback';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent extends CartBaseComponent implements OnInit {
  rating = '';
  percent = 0;
  quantity = 1;
  imageToDisplay = '';
  // productImages = [
  //   { img: '../assets/images/productImage.png' },
  //   { img: '../assets/images/tiresCover.png' },
  //   { img: '../assets/images/productImage.png' },
  //   { img: '../assets/images/productImage.png' },
  // ];

  imagesSlider = {
    speed: 300,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  thumbnailsSlider = {
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    asNavFor: '.feedback',
  };

  ratingGroups = {} as { [prop: string]: Feedback[] };
  ratingGroupsKeys: string[] = [];

  product: Product = {} as Product;
  showImage(imgPath: string): void {
    this.imageToDisplay = imgPath;
  }

  constructor(
    inject: Injector,
    private route: ActivatedRoute,
    private encrDecrService: EncrDecrService,
    private productService: ProductService,
    private snakBarService: SnackBarService
  ) {
    super(inject);
    // this.imageToDisplay = this.productImages[0].img;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      const id = response.get('id');
      if (id) {
        const prodId = this.getProductId(id);
        this.getProductById(prodId);
      }
    });
  }

  private getProductId(id: string): number {
    return +this.encrDecrService.get(id);
  }

  getProductById(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: this.handleProductResponse.bind(this),
    });
  }

  handleProductResponse(response: Response<Product>): void {
    if (response.status && ObjectHasValue(response.data)) {
      this.product = response.data as Product;
      this.calcaulatePercent(this.product.average_feedback);
      this.rating = this.product.average_feedback.toString();
      this.groupingFeedback();
      console.log(this.product);
    } else {
      this.snakBarService.failMessage(response.message);
    }
  }

  calcaulatePercent(percent: number): void {
    if (percent > 0) {
      this.percent = (percent / 5) * 100;
    }
  }

  groupingFeedback(): void {
    if (this.product.feedbacks && this.product.feedbacks.length > 0) {
      this.ratingGroups = this.product.feedbacks.reduce((r, a) => {
        r[a.rating] = r[a.rating] || [];
        r[a.rating].push(a);
        return r;
      }, Object.create(null));
      this.ratingGroupsKeys = Object.keys(this.ratingGroups);
    }
  }

  addQuantity(qty: number): void {
    const newVal = this.quantity + qty;
    if (newVal > 0) {
      if (newVal <= this.product.stock_quantity) {
        this.quantity = newVal;
      } else {
        this.snakBarService.failMessage(
          'This seller has limited stock available'
        );
      }
    } else {
      this.snakBarService.failMessage(
        `You can't place an order below this quantity`
      );
    }
  }

  addProduct(): void {
    if (
      ObjectHasValue(this.product) &&
      this.quantity <= this.product.stock_quantity
    ) {
      this.addToCart(this.product, this.quantity);
    }
  }

  getEcraptedId(id: number): string {
    return this.encrDecrService.set(id.toString());
  }

  copyProduct(): void {
    const url = window.location.href;
    this.copyText(url);
    this.snakBarService.sucessMessage('copied to clipboard !');
  }

  copyText(val: string): void {
    const selBox = this.createJsTextarea(val);
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  private createJsTextarea(val: string): HTMLTextAreaElement {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    return selBox;
  }
}
