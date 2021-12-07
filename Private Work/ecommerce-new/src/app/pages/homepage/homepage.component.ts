import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Home } from 'src/app/model/home';
import { HomeService } from 'src/app/services/API/home/home.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, OnDestroy {
  private subscribtion = new Subscription();
  homeObject = new Home();
  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.subscribtion = this.homeService
                            .getAll()
                            .subscribe((response: any) => {
                              this.homeObject = response.data;
                              console.log(response.data);
                            });
  }

  // tslint:disable-next-line: typedef
  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }

}
