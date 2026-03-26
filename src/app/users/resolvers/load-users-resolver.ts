import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import * as UsersActions from './../store/users.actions';

export const loadUsersResolver: ResolveFn<boolean> = (route, state) => {
  const store: Store = inject(Store);
  store.dispatch(UsersActions.loadUsers());
  return true;
};
