import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EXAMPLE_VEHICLES_DATA } from '../store/vehicles.mock';
import { Vehicle } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService { 
  getVehicles(): Observable<Vehicle[]> { 
    return of(EXAMPLE_VEHICLES_DATA);
  }
}
