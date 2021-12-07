import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  ArrayIsNotEmpty,
  CloneObject,
  IsNullOrEmptyString,
} from 'src/app/helper/helper';
import { Category } from 'src/app/model/category';
import { categoryEnum } from 'src/app/model/enums/categoryEnum';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/API/product/product.service';
import { EncrDecrService } from 'src/app/services/encryption-decryption.service';
import { BaseComponent } from 'src/app/shared/base/base.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent extends BaseComponent implements OnInit {
  productList: Product[] = [];
  oldProductList: Product[] = [];
  form: FormGroup = {} as FormGroup;
  cateEnum: categoryEnum = 1;
  category: Category = {} as Category;
  pageSize = 5;
  page = 1;
  hasFilter = true;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    encrDecrService: EncrDecrService
  ) {
    super(encrDecrService);
  }

  private getProducts(): void {
    this.route.queryParamMap.subscribe(async (param) => {
      await this.filterByCategory(param);
    });
  }

  private async filterByCategory(param: ParamMap): Promise<void> {
    const encCategoryId = this.getCategoryId(param);

    if (encCategoryId) {
      this.productList = await this.getProductByCategoryId(encCategoryId);
    }
    if (
      ArrayIsNotEmpty(this.productList) &&
      ArrayIsNotEmpty(this.productList[0].categories)
    ) {
      this.category = this.productList[0].categories[0];
    }
    this.oldProductList = CloneObject(this.productList);
  }

  private async getProductByCategoryId(
    decCategoryId: string
  ): Promise<Product[]> {
    const categoryId = +decCategoryId;
    switch (categoryId) {
      case categoryEnum.oilproducts: {
        return (
          await this.productService
            .getProductByOilCategoryId(+decCategoryId)
            .toPromise()
        ).data.products;
      }

      case categoryEnum.tireproducts: {
        return (
          await this.productService
            .getProductByTireCategory(+decCategoryId)
            .toPromise()
        ).data.offer_for_you;
      }

      default: {
        return (
          await this.productService
            .getProductByCategoryId(+decCategoryId)
            .toPromise()
        ).data.products;
      }
    }
  }

  private getCategoryId(param: ParamMap): string {
    let encCategoryId = param.get('category') as string;
    encCategoryId = !IsNullOrEmptyString(encCategoryId)
      ? this.getDecraptedId(encCategoryId)
      : categoryEnum.wheel.toString();
    return encCategoryId;
  }

  ngOnInit(): void {
    this.form = this.createForm();
    this.getProducts();
  }

  createForm(): FormGroup {
    return new FormGroup({
      priceFrom: new FormControl(''),
      priceTo: new FormControl(''),
      brands: new FormControl([]),
    });
  }

  filterProducts(): void {
    const filetObject = this.form.value as {
      priceFrom: string;
      priceTo: string;
    };
    if (this.oldProductList && this.oldProductList.length > 0 && filetObject) {
      this.productList = this.oldProductList.filter(
        (pro) =>
          pro.sale_price >= +filetObject.priceFrom &&
          (!filetObject.priceTo ||
            (pro.sale_price <= +filetObject.priceTo &&
              +filetObject.priceTo != 0))
      );
    }
  }
}
