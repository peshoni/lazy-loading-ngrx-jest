import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemoizedSelector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Vehicle } from '../../models/models';
import { selectVehicleById } from '../../store/vehicles.selectors';
import { User } from '../../../users/models/models';
import { PepeStore } from '../../store/my-store';
@Component({
  selector: 'app-vehicle-details',
  imports: [JsonPipe, AsyncPipe],
  templateUrl: './vehicle-details.html',
  styleUrl: './vehicle-details.scss',
})
export class VehicleDetails {
  private store: Store<User> = inject(Store<User>);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  vehicle$!: Observable<Vehicle | undefined>;
  paramId: number;
  constructor() {
    this.paramId = +this.activatedRoute.snapshot.params['id'];
    this.vehicle$ = this.store.select(selectVehicleById(this.paramId));
    // this.store.selectSignal(selectVehicleById(this.paramId))()
    // const a: MemoizedSelector<object, Vehicle | undefined, (s1: Vehicle[]) => Vehicle | undefined> = selectVehicleById(this.paramId); 
    // const vehicle: Vehicle | undefined = this.store.instant(selectVehicleById(this.paramId));


    // console.log(vehicle);
  }
}
