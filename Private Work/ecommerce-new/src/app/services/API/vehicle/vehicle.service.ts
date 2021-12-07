import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '../Base/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService extends DataService {
  private addVehicle = '';

  constructor(http: HttpClient) {
    super(http);
    this.addVehicle = this.url.Vehicle.AddVehicle;
  }

  add(vehicle: any): Observable<any> {
    return this.post(this.addVehicle, vehicle);
  }
}
