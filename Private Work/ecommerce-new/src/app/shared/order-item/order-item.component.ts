import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss'],

})
export class OrderItemComponent implements OnInit {
  @Input() history:boolean = false;
  constructor() {

  }

  ngOnInit(): void {
  }

}
