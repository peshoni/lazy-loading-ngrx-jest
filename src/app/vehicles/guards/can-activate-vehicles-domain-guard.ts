import { CanActivateFn } from '@angular/router';

export const canActivateVehiclesDomainGuard: CanActivateFn = (route, state) => { 
  return true;
};
