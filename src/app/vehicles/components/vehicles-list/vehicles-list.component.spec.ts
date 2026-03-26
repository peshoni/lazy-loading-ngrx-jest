import { render, screen } from '@testing-library/angular';
import { VehiclesListComponent } from './vehicles-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule, provideNoopAnimations } from '@angular/platform-browser/animations';
import { selectVehicles } from '../../store/vehicles.selectors';
import { Vehicle } from '../../models/models';
// import { MockStore } from '@ngrx/store/testing';

describe('VehiclesListComponent', () => {
  it('renders vehicles in table', async () => {
    const mockVehicles: Vehicle[] = [
      { id: 1, brand: 'BMW', fuel: '' },
      { id: 2, brand: 'Audi', fuel: '' },
    ];

    const { fixture ,container } = await render(VehiclesListComponent, {
      imports: [ /*NoopAnimationsModule*/], // important for Material

      providers: [
        provideNoopAnimations(),
        provideMockStore(
          {
            initialState: {
              vehicles: {
                list: [
                  // { id: 1, name: 'ala' },
                  // { id: 2, name: 'bala' },
                ],
              },
            },
          }
        ),


        // Router mock
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(),
          },
        },

        // ActivatedRoute mock
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null,
              },
            },
            params: of({}),
          },
        },
      ],
    });

    //  override selector  
    const store = TestBed.inject(MockStore); //fixture.debugElement.injector.get<any>('MockStore');
    store.overrideSelector(selectVehicles, mockVehicles);
    store.refreshState();

    // trigger lifecycle (AfterViewInit)
    fixture.detectChanges();

    // console.log(await screen.findAllByTestId('paginator'))
    expect(await screen.findAllByTestId('paginator')).toBeTruthy();
    // await DOM update
    expect(await screen.findByText('1')).toBeInTheDocument();
    expect(await screen.findByText('BMW')).toBeInTheDocument();
    expect(await screen.findByText('2')).toBeInTheDocument();
    expect(await screen.findByText('Audi')).toBeInTheDocument();

  });
});

it('navigates to the vehicles details details', async () => {
  const navigate = jest.fn();

  const { fixture } = await render(VehiclesListComponent, {
    imports: [NoopAnimationsModule],
    providers: [
      provideMockStore(),
      { provide: Router, useValue: { navigate } },
      {
        provide: ActivatedRoute,
        useValue: { snapshot: { paramMap: { get: () => null } } },
      },
    ],
  });

  fixture.componentInstance.showDetails({ id: 1 });

  expect(navigate).toHaveBeenCalledWith(['details/1'], expect.any(Object));
});

