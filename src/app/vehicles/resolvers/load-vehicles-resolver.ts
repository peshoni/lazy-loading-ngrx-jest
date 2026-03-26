import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import * as VehiclesActions from './../store/vehicles.actions';

export const loadVehiclesResolver: ResolveFn<boolean> = (route, state) => {
  const store: Store = inject(Store);
  store.dispatch(VehiclesActions.loadVehicles());
  return true;
};
