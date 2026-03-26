
import { User } from '../models/models';
import { createAction, props } from '@ngrx/store';

//#region  Effects 
export const loadUsers = createAction('[Users] Load Users');

export const loadUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: any[]; }>()
);

export const loadUsersFailure = createAction(
  '[Users] Load Users Failure',
  props<{ error: any; }>()
);
//#endregion 
export const removeById = createAction(
  '[Users] Remove User',
  props<{ id: number; }>()
);

export const updateUser = createAction(
  '[Users] Update User',
  props<{ user: User; }>()
);

export const updateUserSuccess = createAction(
  '[Users] Update User success',
  props<{ user: User ; }>()
);

export const updateUsersFailure = createAction(
  '[Users] Update User Failure',
  props<{ error: any; }>()
);

export const failure = createAction(
  '[Users] Users endpoint failure',
  props<{ error: any; }>()
);

// export const findById = createAction(
//   '[Users] Find user by id',
//   props<{ id: number; }>()
// );

