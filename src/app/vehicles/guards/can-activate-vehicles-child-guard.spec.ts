import { TestBed } from '@angular/core/testing';
import { CanActivateChildFn } from '@angular/router';

import { canActivateVehiclesChildGuard } from './can-activate-vehicles-child-guard';

xdescribe('canActivateVehiclesChildGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => canActivateVehiclesChildGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
