import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
  styles: [`
  .star {
    position: relative;
    display: inline-block;
    font-size: 2.5rem;
    color: #d3d3d3;
  }
  .full {
    color: #FFC107;
  }
  .half {
    position: absolute;
    display: inline-block;
    overflow: hidden;
    color: #FFC107;
  }
`]
})
export class RatingComponent implements OnInit {
  currentRate = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
