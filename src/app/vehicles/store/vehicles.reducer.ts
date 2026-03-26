
import { createReducer, on } from '@ngrx/store';
import * as VehiclesActions from './vehicles.actions';
import { Vehicle } from '../models/models';

export interface VehiclesState {
    vehicles: Vehicle[];
    loading: boolean;
    error: any;
}
/**
 * Initial state is an Empty array
 */
export const initialState: VehiclesState = {
    vehicles: [],
    loading: false,
    error: null
};

export const vehiclesReducer = createReducer(
    initialState,
    //#region 
    on(VehiclesActions.loadVehicles, (state) => ({
        ...state,
        loading: true
    })),

    on(VehiclesActions.loadVehiclesSuccess, (state, { vehicles }) => ({
        ...state,
        vehicles,
        loading: false
    })),

    on(VehiclesActions.loadVehiclesFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),
    //#endregion

    // on(VehiclesActions.addVehicles, (state, { vehicle }) => ({
    //     ...state,
    //     vehicles: [...state.vehicles, vehicle]
    // })),

    on(VehiclesActions.removeById, (state, { id }) => ({
        ...state,
        vehicles: state.vehicles.filter(u => u.id !== id)
    })), 
    
);