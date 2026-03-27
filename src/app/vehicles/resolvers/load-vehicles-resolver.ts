import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { VehiclesDataStore } from '../signal-store/vehicles.datasource';

export const loadVehiclesResolver: ResolveFn<boolean> = (route, state) => {
  const vehiclesDataStore = inject(VehiclesDataStore);
  vehiclesDataStore.loadAll();
  return true;
};
