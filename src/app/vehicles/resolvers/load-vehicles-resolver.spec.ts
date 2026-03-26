import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, RouterStateSnapshot } from '@angular/router';
import { loadVehiclesResolver } from './load-vehicles-resolver';
import * as VehiclesActions from './../store/vehicles.actions';

describe('loadVehiclesResolver', () => {
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
      loadVehiclesResolver(route, state)
    );

    // 3. Compare actions 
    expect(dispatchedAction).toEqual(VehiclesActions.loadVehicles());

    expect(result).toBe(true);
  });
}); 