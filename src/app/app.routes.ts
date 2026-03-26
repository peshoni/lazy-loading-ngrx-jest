import { Routes } from '@angular/router';
import { PathSegments } from './shared/path-segments.enum';
import { canActivateUserDomainGuard } from './users/guards/can-activate-user-domain-guard';
import { canActivateVehiclesDomainGuard } from './vehicles/guards/can-activate-vehicles-domain-guard';
import { loadUsers } from './users/store/users.actions';
import { loadUsersResolver } from './users/resolvers/load-users-resolver';
import { loadVehiclesResolver } from './vehicles/resolvers/load-vehicles-resolver';

export const routes: Routes = [
    {
        path: PathSegments.USERS,
        canActivate: [canActivateUserDomainGuard],
        resolve:[loadUsersResolver],
        loadChildren: () => import('./users/users-routes').then(m => m.USERS_ROUTES)
    },
    {
        path: PathSegments.VEHICLES,
        canActivate: [canActivateVehiclesDomainGuard],
          resolve:[loadVehiclesResolver],
        loadChildren: () => import('./vehicles/vehicles-routes').then(m => m.VEHICLES_ROUTES)
    },
    {
        path: '**', redirectTo: PathSegments.USERS, pathMatch: 'full'
    }
];
