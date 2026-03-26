import { User } from "../models/models";
import { createReducer, on } from '@ngrx/store';
import * as UsersActions from './users.actions';

export interface UsersState {
    users: User[]; 
    loading: boolean;
    error: any;
}
/**
 * Initial state is an Empty array
 */
export const initialState: UsersState = {
    users: [],
    loading: false,
    error: null
};

export const usersReducer = createReducer(
    initialState,
    //#region 
    on(UsersActions.loadUsers, (state) => ({
        ...state,
        loading: true
    })),

    on(UsersActions.loadUsersSuccess, (state, { users }) => ({
        ...state,
        users,
        loading: false
    })),

    on(UsersActions.loadUsersFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),
    //#endregion

    on(UsersActions.removeById, (state, { id }) => ({
        ...state,
        users: state.users.filter(u => u.id !== id)
    })),
    // on(UsersActions.addUser, (state, { user }) => ({
    //     ...state,
    //     users: [...state.users, user]
    // })),
);