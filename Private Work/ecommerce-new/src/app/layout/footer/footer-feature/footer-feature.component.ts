import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-feature',
  templateUrl: './footer-feature.component.html',
  styleUrls: ['./footer-feature.component.scss']
})
export class FooterFeatureComponent implements OnInit {
@Input() icon:string;
@Input() title:string;
@Input() details:string;
  constructor() {
    this.icon="footerIcon-2";
    this.title="Largest Catalogue";
    this.details="We have millions of one-of-a-kind items in our shop";
  }

  ngOnInit(): void {
  }

}
