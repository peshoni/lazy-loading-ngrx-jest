import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { usersReducer } from './users/store/users.reducer';
import { provideEffects } from '@ngrx/effects';
import { UsersEffects } from './users/store/users.effects';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { VehiclesDataStore } from './vehicles/signal-store/vehicles.datasource';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([])),
    provideStore({
      users: usersReducer
    }),
    provideEffects([UsersEffects]),
    VehiclesDataStore,
    provideStoreDevtools({
      maxAge: 25, // Запазва последните 25 състояния
      logOnly: !isDevMode(), // В продукция само логва, без да позволява промени
      autoPause: true, // Паузира при неактивен таб (за производителност)
      trace: false, // Дали да записва stack trace за всеки екшън
      traceLimit: 75, // Лимит на трасирането 
    })
  ]
};
