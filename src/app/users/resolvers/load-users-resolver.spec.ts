import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
 import { loadUsersResolver } from './load-users-resolver';
import * as UsersActions from './../store/users.actions';

describe('loadUsersResolver', () => {
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore(),
      ],
    });
    store = TestBed.inject(MockStore);
  });

  it('should dispatch loadVehicles action and return true', () => {
    // 1. Custom spy
    let dispatchedAction: any = null;

    // Override original dispatch function with a custom one
    (store as any).dispatch = (action: any) => {
      dispatchedAction = action;
    };

    const route = {} as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    // 2. Execute the resolver
    const result: MaybeAsync<boolean | RedirectCommand> = TestBed.runInInjectionContext(() =>
      loadUsersResolver(route, state)
    );

    // 3. Compare actions 
    expect(dispatchedAction).toEqual(UsersActions.loadUsers());
    expect(result).toBe(true);
  });
});
