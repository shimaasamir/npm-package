import { Component, Input, OnInit } from '@angular/core';
import { Feedback } from 'src/app/model/feedback';

@Component({
  selector: 'app-rating-bar',
  templateUrl: './rating-bar.component.html',
  styleUrls: ['./rating-bar.component.scss'],
})
export class RatingBarComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('total') totalReview: number;

  // tslint:disable-next-line: no-input-rename
  @Input('ratingGroups') ratingGroups: Feedback[] = [];

  ratName = '';
  percent = '0';
  constructor() {
    this.totalReview = 0;
  }

  ngOnInit(): void {
    if (this.ratingGroups && this.ratingGroups.length > 0) {
      this.ratName = this.ratingGroups[0].rating.toString();
      const toatalPerGroup = this.ratingGroups.length;
      this.percent =
        ((toatalPerGroup / this.totalReview) * 100).toString() + '%';
    }
  }
}
