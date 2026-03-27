import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType, } from '@ngrx/effects';
import { UsersService } from '../../api/users.service';
import { UserApiActions} from './users.actions';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';

@Injectable()
export class UsersEffects {
    private actions$: Actions = inject(Actions);

    loadUsers$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserApiActions['[Users]Load-Users']), // When this action is dispatched, a request will be made to load the data 
            mergeMap((_) => {
                console.log(_);
                return this.usersService.getUsers().pipe(
                    map(users => UserApiActions['[Users]LoadUsersSuccess']({ users })),
                    catchError(error => of(UserApiActions['[Users]Api-error']({ error })))
                );
            })
        )
    );

    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserApiActions['[Users]UpdateUser']),
            exhaustMap(({ user }) => {
                return this.usersService.update(user).pipe(
                    map(updatedUser => UserApiActions['[Users]UpdateUserSuccess']({ user: updatedUser })),
                    catchError(error => of(UserApiActions['[Users]Api-error']({ error })))
                );
            })
        )
    );

    constructor(private usersService: UsersService) {
    }
}