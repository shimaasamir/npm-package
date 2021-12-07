import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-feature-card',
  templateUrl: './home-feature-card.component.html',
  styleUrls: ['./home-feature-card.component.scss']
})
export class HomeFeatureCardComponent implements OnInit {
@Input() title:string;
@Input() iconName:string;
@Input() cardClass:string;
  constructor() {
    this.title = "";
    this.iconName = "";
    this.cardClass = "";
  }

  ngOnInit(): void {
  }

}
