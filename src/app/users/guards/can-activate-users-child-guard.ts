import { CanActivateChildFn } from '@angular/router';

export const canActivateUsersChildGuard: CanActivateChildFn = (childRoute, state) => {
  return true;
};
