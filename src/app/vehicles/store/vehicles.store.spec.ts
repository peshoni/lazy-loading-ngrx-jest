import * as selectors from './vehicles.selectors';
import { VehiclesState } from './vehicles.reducer';
import { Vehicle } from '../models/models';

describe('Vehicles Selectors', () => {
    // 1. Mock state
    const mockVehicles: Vehicle[] = [
        { id: 1, brand: 'Tesla', fuel: 'electric' },
        { id: 2, brand: 'BMW', fuel: 'diesel' },
        { id: 3, brand: 'Audi', fuel: 'gasoline' },
    ];

    const initialState: { vehicles: VehiclesState; } = {
        vehicles: {
            vehicles: mockVehicles,
            loading: false,
            error: null
        }
    };

    it('should select the vehicles list', () => {
        // Call the selector directly 
        const result = selectors.selectVehicles(initialState);
        expect(result).toEqual(mockVehicles);
        expect(result.length).toBe(3);
    });

    it('should find vehicle by id (Factory Selector)', () => {
        // При фабриките първо извикваме функцията с параметъра, 
        // а после резултатната функция със стейта
        const result = selectors.selectVehicleById(2)(initialState);
        expect(result).toEqual(mockVehicles[1]);
        expect(result?.brand).toBe('BMW');
    });

    it('should return undefined if vehicle id does not exist', () => {
        const result = selectors.selectVehicleById(99)(initialState);
        expect(result).toBeUndefined();
    });

    it('should page users correctly', () => { 
        const result = selectors.page(0, 2)(initialState);
        expect(result.length).toBe(2);
        expect(result[0].id).toBe(1);
        expect(result[1].id).toBe(2);
    });

    it('should sort users using util function', () => { 
        const result = selectors.sortVehicles('brand', 'asc', 0, 10)(initialState); 
        expect(result[0].brand).toBe('Audi');
    });
});