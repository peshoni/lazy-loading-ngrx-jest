// users.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../services/users.service';
import * as UsersActions from './users.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class UsersEffects {
    private actions$: Actions = inject(Actions);

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UsersActions.loadUsers), // When this action is dispatched, a request will be made to load the data 
            mergeMap((_) => {
                console.log(_);
                return this.usersService.getUsers().pipe(
                    map(users =>
                        UsersActions.loadUsersSuccess({ users })
                    ),
                    catchError(error =>
                        of(UsersActions.loadUsersFailure({ error }))
                    )
                );
            })
        )
    );

    constructor(

        private usersService: UsersService
    ) {
        console.log('Actions:', this.actions$);
    }
}