import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { usersReducer } from './users/store/users.reducer';
import { provideEffects } from '@ngrx/effects';
import { UsersEffects } from './users/store/users.effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { VehiclesEffects } from './vehicles/store/vehicles.effects';
import { vehiclesReducer } from './vehicles/store/vehicles.reducer';
import { provideNoopAnimations, provideAnimations } from '@angular/platform-browser/animations';

// import { withAnimations } from '@angular/platform-browser/animations';
export const appConfig: ApplicationConfig = {
  providers: [
    // withAnimations(),
  provideAnimations(),
    // provideNoopAnimations(),
  
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([])),
    provideStore({
      users: usersReducer,
      vehicles: vehiclesReducer
    }),
    provideEffects([UsersEffects, VehiclesEffects])
  ]
};
