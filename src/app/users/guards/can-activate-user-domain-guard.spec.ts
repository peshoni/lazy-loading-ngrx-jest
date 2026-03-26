import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';

import { canActivateUserDomainGuard } from './can-activate-user-domain-guard';

describe('canActivateUserDomainGuard', () => {
  it('Should the user be allowed to visit this path', () => {
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    const result: MaybeAsync<GuardResult> = TestBed.runInInjectionContext(() =>
      canActivateUserDomainGuard(route, state)
    );
    expect(result).toBe(true);
  });
});
