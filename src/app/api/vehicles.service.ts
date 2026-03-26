import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EXAMPLE_VEHICLES_DATA } from '../vehicles/store/vehicles.mock';
import { Vehicle } from '../vehicles/models/models';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService { 
  vehicles = EXAMPLE_VEHICLES_DATA
  getVehicles(): Observable<Vehicle[]> { 
    return of(this.vehicles);
  }

  updateVehicles(vehciles:Vehicle){
    
  }
}
