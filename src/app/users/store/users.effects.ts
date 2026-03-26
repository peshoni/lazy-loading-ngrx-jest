import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, } from '@ngrx/effects';
import { UsersService } from '../../api/users.service';
import { loadUsers, loadUsersSuccess, loadUsersFailure, updateUser, updateUserSuccess, updateUsersFailure } from './users.actions';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';

@Injectable()
export class UsersEffects {
    private actions$: Actions = inject(Actions);

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadUsers), // When this action is dispatched, a request will be made to load the data 
            mergeMap((_) => {
                console.log(_);
                return this.usersService.getUsers().pipe(
                    map(users => loadUsersSuccess({ users })),
                    catchError(error => of(loadUsersFailure({ error })))
                );
            })
        )
    );

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(updateUser),
            exhaustMap(({ user }) => {
                return this.usersService.update(user).pipe(
                    map(updatedUser => updateUserSuccess({ user: updatedUser })),
                    catchError(error => of(updateUsersFailure({ error })))
                );
            })
        )
    );

    constructor(private usersService: UsersService) {
    }
}