import { User } from "../models/models";
import { createReducer, on } from '@ngrx/store';
import { UserApiActions } from './users.actions';

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
    on(UserApiActions["[Users]Load-Users"], (state) => ({
        ...state,
        loading: true
    })),

    on(UserApiActions["[Users]LoadUsersSuccess"], (state, { users }) => ({
        ...state,
        users,
        loading: false
    })),

    on(UserApiActions["[Users]Api-error"], (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),
    //#endregion

    on(UserApiActions["[Users]RemoveUser"], (state, { id }) => ({
        ...state,
        users: state.users.filter(u => u.id !== id)
    })),

    on(UserApiActions["[Users]UpdateUserSuccess"], (state, { user }) => ({
        ...state,
        users: state.users.map(u => u.id === user.id ? user : u)
    })),

); 
