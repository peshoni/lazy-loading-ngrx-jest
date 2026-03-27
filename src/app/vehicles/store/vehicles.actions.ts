import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Vehicle } from '../models/models';

export const VehiclesApiActions = createActionGroup({
  source: 'Vehicles API',
  events: {
    '[Vehicles] Load Vehicles': emptyProps(),
    '[Vehicles] Load Vehicles Success': props<{ vehicles: Vehicle[]; }>(),
    // 
    '[Vehicles] Remove Vehicle': props<{ id: number; }>(),
    '[Vehicles] Remove Vehicle success': props<{ id: number; }>(),
    // 
    '[Vehicles] Update Vehicle': props<{ vehicle: Vehicle; }>(),
    '[Vehicles] Update Vehicle success': props<{ vehicle: Vehicle; }>(),
    // Common error action
    '[Vehicles] Api-error': props<{ error: string; }>(),
  },
});

