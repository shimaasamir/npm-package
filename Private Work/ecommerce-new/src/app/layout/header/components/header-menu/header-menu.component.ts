import { Component, OnInit } from '@angular/core';
import { categoryEnum } from 'src/app/model/enums/categoryEnum';
import { EncrDecrService } from 'src/app/services/encryption-decryption.service';
import { BaseComponent } from 'src/app/shared/base/base.component';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
})
export class HeaderMenuComponent extends BaseComponent implements OnInit {
  wheelCategory: categoryEnum = categoryEnum.wheel;
  tireCategory: categoryEnum = categoryEnum.tireproducts;
  oilCategory: categoryEnum = categoryEnum.oilproducts;
  breakCategory: categoryEnum = categoryEnum.break;
  accessories: categoryEnum = categoryEnum.accessories;
  engine: categoryEnum = categoryEnum.engine;
  interior: categoryEnum = categoryEnum.interior;
  exterior: categoryEnum = categoryEnum.exterior;

  constructor(encrDecrService: EncrDecrService) {
    super(encrDecrService);
  }

  ngOnInit(): void {}
}
