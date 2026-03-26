import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { VehiclesState } from './vehicles.reducer';
import { sortItems } from '../../shared/util-functions';
import { Vehicle } from '../models/models';

export const selectVehiclesState =
    createFeatureSelector<VehiclesState>('vehicles');

export const selectVehicles = createSelector(
    selectVehiclesState,
    (state) => state?.vehicles
);

// getById
export const selectVehicleById = (id: number) =>
    createSelector(
        selectVehicles,
        (vehicles) => (vehicles || []).find(u => u.id === id)
    );

export const page = (offset: number, pageSize: number) => createSelector(
    selectVehicles,
    (vehicles) => vehicles.slice(offset, pageSize)
);

export const sortVehicles = <T>(property: keyof T, direction: string, offset: number, pageSize: number) => createSelector(
    selectVehicles,
    (vehicles) => {
        return sortItems<T>(direction, vehicles as T[], property, offset, pageSize);
    }
);
