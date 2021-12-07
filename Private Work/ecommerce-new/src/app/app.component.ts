import { Component, OnInit } from '@angular/core';
import { BrandService } from './services/API/brand/brand.service';
import { CategoryService } from './services/API/category/category.service';
import { SubCategoryService } from './services/API/sub-category/subCategory.service';
import { LocalDataService } from './services/LocalData.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Odeggo';

  constructor(
    private localDataService: LocalDataService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService
  ) {}

  async ngOnInit(): Promise<void> {
    // debugger
    await this.setLocalData();
  }

  private async setLocalData(): Promise<void> {
    await this.setCategoriesAndSubCategories();
    await this.setBrand();
  }

  private async setCategoriesAndSubCategories(): Promise<void> {
    const response = await this.categoryService.getAll().toPromise();
    response.data.forEach(async (category) => {
      category.subCategory = (
        await this.subCategoryService
          .getAllByCategoryId(category.id)
          .toPromise()
      ).data;
    });
    this.localDataService.changeCurrentCategoryList(response.data);
  }

  private async setBrand(): Promise<void> {
    const brandList = (await this.brandService.getAll().toPromise()).data;
    this.localDataService.changeCurrentBrandList(brandList);
  }
}
