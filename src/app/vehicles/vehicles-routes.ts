import { Routes } from "@angular/router";
import { canActivateVehiclesChildGuard } from "./guards/can-activate-vehicles-child-guard";
import { PathSegments } from "../shared/path-segments.enum";

export const VEHICLES_ROUTES: Routes = [
    {
        path: PathSegments.EMPTY,
        canActivateChild: [canActivateVehiclesChildGuard],
        children: [
            {
                path: PathSegments.EMPTY,
                loadComponent: () =>
                    import('./components/vehicles-list/vehicles-list.component').then(m => m.VehiclesListComponent),
            },
            {
                path: PathSegments.DETAILS + '/:id',
                loadComponent: () =>
                    import('./components/vehicle-details/vehicle-details').then(m => m.VehicleDetails),
            },
        ]
    },
];