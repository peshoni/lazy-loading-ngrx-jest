import { createAction, props } from '@ngrx/store';
import { Vehicle } from '../models/models';

//#region  Effects 
export const loadVehicles = createAction('[Vehicles] Load Vehicles');

export const loadVehiclesSuccess = createAction(
  '[Vehicles] Load Vehicles Success',
  props<{ vehicles: Vehicle[] }>()
);

export const loadVehiclesFailure = createAction(
  '[Vehicles] Load Vehicles Failure',
  props<{ error: any }>()
);
//#endregion

export const addVehicles = createAction(
    '[Vehicles] Add Vehicle',
    props<{ vehicle: Vehicle; }>()
);

export const removeVehicles = createAction(
    '[Vehicles] Remove Vehicle',
    props<{ id: number; }>()
);

export const findById = createAction(
    '[Vehicles] Find vehicle by id',
    props<{ id: number; }>()
);

 