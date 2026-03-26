import { Routes } from "@angular/router";
import { canActivateUsersChildGuard } from "./guards/can-activate-users-child-guard";
import { PathSegments } from "../shared/path-segments.enum";

export const USERS_ROUTES: Routes = [
    {
        path: PathSegments.EMPTY,
        canActivateChild: [canActivateUsersChildGuard],
        children: [
            {
                path: PathSegments.EMPTY,
                loadComponent: () =>
                    import('./components/users-list/users-list.component').then(m => m.UsersListComponent),
            },
            {
                path: PathSegments.DETAILS + '/:id',
                loadComponent: () =>
                    import('./components/user-details/user-details.component').then(m => m.UserDetailsComponent),
            }
        ]
    }
]; 