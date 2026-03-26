import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as VehicleActions from './vehicles.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { VehiclesService } from '../../api/vehicles.service';

@Injectable()
export class VehiclesEffects {
    private actions$: Actions = inject(Actions);
    private vehiclesService: VehiclesService = inject(VehiclesService);

    loadVehicles$ = createEffect(() =>
        this.actions$.pipe(
            ofType(VehicleActions.loadVehicles),
            mergeMap((_) => {
                console.log(_);
                return this.vehiclesService.getVehicles().pipe(
                    map(vehicles =>
                        VehicleActions.loadVehiclesSuccess({ vehicles })
                    ),
                    catchError(error =>
                        of(VehicleActions.loadVehiclesFailure({ error }))
                    )
                );
            }
            )
        )
    );
     
}