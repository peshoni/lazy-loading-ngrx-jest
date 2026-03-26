import { CanActivateChildFn } from '@angular/router';

export const canActivateVehiclesChildGuard: CanActivateChildFn = (childRoute, state) => {  
  return true;
};
