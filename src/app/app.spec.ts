
import { App } from './app';
import { render, screen } from '@testing-library/angular';
import { provideMockStore } from '@ngrx/store/testing';
import { VehiclesState } from './vehicles/store/vehicles.reducer';
import { UsersState } from './users/store/users.reducer';
//https://github.com/testing-library/angular-testing-library/blob/main/apps/example-app/src/app/examples/00-single-component.spec.ts
describe('AppComponent', () => {
  const vehicleId = 1;
  const mockVehicle = {
    id: vehicleId,
    brand: 'Tesla Model 3',
    fuel: 'electric'
  };

  const mockVehicleState: VehiclesState = {// Feature-а (from createFeatureSelector)
    vehicles: [mockVehicle],
    loading: false,
    error: null
  };

  const mockUsersState: UsersState = {
    users: [],
    loading: false,
    error: null
  };

  test('increments count on click', async () => {
    const { container, debugElement } = await render(App, {
      bindings: [

      ],
      declarations: [

      ],
      componentProperties: {
        count: 10
      },
      providers: [
        provideMockStore({
          // Load initial state
          initialState: {
            vehicles: mockVehicleState,
            users: mockUsersState
          }
        }),
      ]
    });

    const component: App = debugElement.componentInstance;
    component.increment();
    expect(component.count).toBe(11);
    expect(container).toBeTruthy();

    component.greeting.set('Hi');
    expect(component.greeting()).toBe('Hi');
    component.name.set('Petar');
    expect(component.name()).toBe('Petar');

    const expectedGreeting = 'Hi, Petar';
    expect(component.computedGreeting()).toBe(expectedGreeting);
    const greetingParagraph: HTMLParagraphElement = (await screen.findAllByTestId('greeting'))[0] as HTMLParagraphElement;
    expect(greetingParagraph.textContent).toBe(expectedGreeting);

  });
});
