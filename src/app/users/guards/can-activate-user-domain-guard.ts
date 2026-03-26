import { CanActivateFn } from '@angular/router';

export const canActivateUserDomainGuard: CanActivateFn = (route, state) => {
  return true;
};
