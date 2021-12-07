import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Response } from 'src/app/model/api/response';
import { Brand } from 'src/app/model/brand';
import { Model } from 'src/app/model/model';
import { Vehicle } from 'src/app/model/vehicle';
import { ModelService } from 'src/app/services/API/model/model.service';
import { VehicleService } from 'src/app/services/API/vehicle/vehicle.service';
import { LocalDataService } from 'src/app/services/LocalData.service';
import { SnackBarService } from 'src/app/services/snack-bar.service';

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.scss'],
})
export class HomeSearchComponent implements OnInit, OnDestroy {
  form = {} as FormGroup;
  brandList: Brand[] = [];
  modelList: Model[] = [];
  yearsList: Model[] = [];

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private localDataService: LocalDataService,
    private modelService: ModelService,
    private vehicleService: VehicleService,
    private _snackBar: SnackBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.localDataService.currentBrandList.subscribe((response) => {
      this.brandList = response;
    });
  }

  redirectTo(): void {
    const vehicle = {
      year: this.form.get('year')?.value,
      model_id: this.form.get('modelId')?.value,
      brand_id: this.form.get('brandId')?.value,
    } as Vehicle;
    this.vehicleService
      .add(vehicle)
      .subscribe((response: Response<Vehicle>) => {
        this._snackBar.sucessMessage('Vehicle added successfully');
      });
    this.router.navigate(['/categories']);
  }

  createForm(): void {
    this.form = new FormGroup({
      modelId: new FormControl(0, [Validators.required]),
      brandId: new FormControl(0, [Validators.required]),
      year: new FormControl(0, [Validators.required]),
    });
  }

  changeBrand(event: any): void {
    if (event && event.target) {
      const id = event.target.value;
      this.setModelByBrandId(+id);
    }
  }

  changeModel(event: any): void {
    if (event && event.target) {
      const id = event.target.value;
      this.setModelYearByModelId(+id);
    }
  }

  private setModelByBrandId(brandId: number): void {
    if (brandId !== 0) {
      this.modelService
        .getModelsByBrandId(brandId)
        .pipe(takeUntil(this.destroy$.asObservable()))
        .subscribe((response) => {
          this.modelList = response.data;
        });
    }
  }

  private setModelYearByModelId(modelId: number): void {
    if (modelId !== 0) {
      this.modelService
        .getModelYearByModelId(modelId)
        .pipe(takeUntil(this.destroy$.asObservable()))
        .subscribe((response) => {
          this.yearsList = response.data;
        });
    }
  }

  // prevent memory leak
  ngOnDestroy(): void {
    if (this.destroy$) {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }
  }
}
