import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.reducer';
import { sortItems } from '../../shared/util-functions';

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectUsers = createSelector(
    selectUsersState,
    (state) => state.users
);

// getById
export const selectUserById = (id: number) =>
    createSelector(
        selectUsers,
        (users) => users.find(u => u.id === id)
    );

export const page = (offset: number, pageSize: number) => createSelector(
    selectUsers,
    (users) => users.slice(offset, pageSize)
);

export const sortUsers = <T>(property: keyof T, direction: string, offset: number, pageSize: number) => createSelector(
    selectUsers,
    (users) => {
        return sortItems<T>(direction, users as T[], property, offset, pageSize);
    }
);
