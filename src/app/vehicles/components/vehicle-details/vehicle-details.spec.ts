import { render, screen } from '@testing-library/angular';
import { provideMockStore } from '@ngrx/store/testing';
import { ActivatedRoute } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { VehicleDetails } from './vehicle-details';
import { VehiclesState } from '../../store/vehicles.reducer';

describe('VehicleDetails Component', () => {
  it('should load vehicle in constructor', async () => {
    const vehicleId = 1;
    const mockVehicle = {
      id: vehicleId,
      brand: 'Tesla',
      fuel: 'electric'
    };

    const mockVehicleState: VehiclesState = {// Feature-а (from createFeatureSelector)
      vehicles: [mockVehicle],
      loading: false,
      error: null
    };

    const { fixture } = await render(VehicleDetails, {
      providers: [
        provideNoopAnimations(),
        provideMockStore({
          // Load initial state
          initialState: {
            vehicles: mockVehicleState
          }
        }),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: '1' } } }
        },
      ],
    });

    // wake up AsyncPipe
    fixture.detectChanges();
    const label = await screen.findByText(/vehicle-details works!/i);
    expect(label).toBeTruthy();

    
    // await rendering of the JSON 
    const content = await screen.findByText(/Tesla/);
    expect(content).toBeTruthy();
  });
});