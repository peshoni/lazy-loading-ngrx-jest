
import { User } from '../models/models';
import { createAction, createActionGroup,  emptyProps, props } from '@ngrx/store';

//#region  Effects  

export const UserApiActions = createActionGroup({
  source: 'Users API',
  events: {
    '[Users]Load-Users': emptyProps(),
    '[Users] Load Users Success': props<{ users: User[]; }>(),
    // 
    '[Users] Remove User': props<{ id: number; }>(),
    '[Users] Remove User success': props<{ id: number; }>(), 
    // 
    '[Users] Update User': props<{ user: User; }>(),
    '[Users] Update User success': props<{ user: User; }>(),
    // Common error action
    '[Users] Api-error': props<{ error: string; }>(),
  },
});

