import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { EXAMPLE_VEHICLES_DATA } from './vehicles.mock';
import { Vehicle } from '../vehicles/models/models';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {

  private vehicles: BehaviorSubject<Vehicle[]> = new BehaviorSubject(EXAMPLE_VEHICLES_DATA);
  getVehicles(): Observable<Vehicle[]> {
    return this.vehicles.asObservable();
  }

  update(vehicle: Vehicle) {
    const newPersistedState = this.vehicles.getValue().map(v => v.id === vehicle.id ? vehicle : v); // Mock API mutation    
    this.vehicles.next(newPersistedState);
    return of(vehicle);
  }
  delete(id: number): Observable<number> {
    const newPersistedState = this.vehicles.getValue().filter(v => v.id !== id); // Mock API mutation    
    this.vehicles.next(newPersistedState);
    return of(id);
  }
}
