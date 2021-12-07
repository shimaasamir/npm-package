import { Component, Injectable, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlgoliaProduct } from 'src/app/model/algolia-search';
import { HomeService } from 'src/app/services/API/home/home.service';
import { EncrDecrService } from 'src/app/services/encryption-decryption.service';
import { BaseComponent } from 'src/app/shared/base/base.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent implements OnInit {
  data: AlgoliaProduct[] = [];
  keyword = 'name_other';
  constructor(
    private homeService: HomeService,
    private route: Router,
    encrDecrService: EncrDecrService
  ) {
    super(encrDecrService);
  }

  ngOnInit(): void {}

  search(keyword: string): void {
    this.homeService.homeSearch(keyword, 1, 10).subscribe((response) => {
      this.data = response.list;
    });
  }

  redirectToProductDetails(id: number): void {
    // tslint:disable-next-line: variable-name
    const encr_id = this.getEcraptedId(id);
    this.route.navigate(['/product', encr_id]);
  }

  onFocused(): void {
    // this.data = [];
  }

  public pleaseDontFilter(items: any): any {
    return items;
  }
}
