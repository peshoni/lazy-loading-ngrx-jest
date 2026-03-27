import { computed, inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState, withComputed } from '@ngrx/signals';
import { removeEntity, setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Observable, pipe, switchMap, tap } from 'rxjs';
import { Vehicle } from '../models/models';
import { VehiclesService } from '../../api/vehicles.service';
import { toObservable } from '@angular/core/rxjs-interop';
export const VehiclesDataStore = signalStore(
  { providedIn: 'root' },
  // Initial state
  withEntities<Vehicle>(),
  // Metadata state
  withState({ loading: false, error: null as string | null, selectedId: -1 }),
  // Methods that replaces Actions + Effects + Reducers
  withMethods((store, vehiclesService = inject(VehiclesService)) => {
    const state$ = toObservable(store.entities);
    return ({
      // Analog of  Effect + Action + Reducer  
      loadAll: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loading: true })),
          switchMap(() => vehiclesService.getVehicles().pipe(
            tap({
              next: (vehicles) => patchState(store, setAllEntities(vehicles), { loading: false }),
              error: (err) => patchState(store, { error: err.message, loading: false })
            })
          ))
        )
      ),
  
      getCurrentState$(): Observable<Vehicle[]> {
        return state$;
      }, 
    
      updateVehicle: rxMethod<Vehicle>(
        pipe(
          switchMap((vehicle) => vehiclesService.update(vehicle).pipe(
            tap((updated) => patchState(store, updateEntity({ id: updated.id, changes: updated })))
          ))
        )
      ), 
       
      removeVehicle: rxMethod<number>(
        pipe(
          switchMap((id) => vehiclesService.delete(id).pipe(
            tap(() => patchState(store, removeEntity(id)))
          ))
        )
      ),

      // Triggers selectedEntity computation 
      selectById(id: number) {
        patchState(store, { selectedId: id });
      },

      clearSelection() {
        patchState(store, { selectedId: -1 });
      },

      findById(id: number) {
        // entityMap is object Record<id, Entity>, with O(1) search
        return store.entityMap()[id] ?? null;
      }
    });
  }),

  withComputed(({ entityMap, selectedId }) => ({
    // recalculates when setting a new value of selectedId
    selectedEntity: computed(() => {
      const id = selectedId();
      return id > 0 ? entityMap()[id] : null;
    })
  })),
);