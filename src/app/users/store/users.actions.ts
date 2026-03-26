
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

// export const addUser = createAction(
//   '[Users] Add User',
//   props<{ user: User; }>()
// );

export const removeById = createAction(
  '[Users] Remove User',
  props<{ id: number; }>()
);

// export const findById = createAction(
//   '[Users] Find user by id',
//   props<{ id: number; }>()
// );

