import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { canActivateUsersChildGuard } from './can-activate-users-child-guard';
 
describe('canActivateUsersChildGuard', () => {
  // beforeEach()
  it('Should the user be allowed to visit this child path', () => {
    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;
    const result: MaybeAsync<GuardResult> = TestBed.runInInjectionContext(() =>
      canActivateUsersChildGuard(route, state)
    );
    expect(result).toBe(true);
  });
});
