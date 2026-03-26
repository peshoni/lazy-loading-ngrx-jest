import * as selectors from './users.selectors';
import { UsersState } from './users.reducer';

describe('Users Selectors', () => {
    // 1. Mock state
    const mockUsers = [
        { id: 1, name: 'Ivan', family: 'Ivanov' },
        { id: 2, name: 'Maria', family: 'Petrova' },
        { id: 3, name: 'Georgi', family: 'Georgiev' },
    ];

    const initialState: { users: UsersState; } = {
        users: {
            users: mockUsers,
            loading: false,
            error: null
        }
    };

    it('should select the users list', () => {
        // Call the selector directly 
        const result = selectors.selectUsers(initialState);
        expect(result).toEqual(mockUsers);
        expect(result.length).toBe(3);
    });

    it('should find user by id (Factory Selector)', () => {
        // При фабриките първо извикваме функцията с параметъра, 
        // а после резултатната функция със стейта
        const result = selectors.selectUserById(2)(initialState);
        expect(result).toEqual(mockUsers[1]);
        expect(result?.name).toBe('Maria');
    });

    it('should return undefined if user id does not exist', () => {
        const result = selectors.selectUserById(99)(initialState);
        expect(result).toBeUndefined();
    });

    it('should page users correctly', () => {
        // Тест за пагинация: взимаме от 0 до 2 (първите двама)
        const result = selectors.page(0, 2)(initialState);
        expect(result.length).toBe(2);
        expect(result[0].id).toBe(1);
        expect(result[1].id).toBe(2);
    });

    it('should sort users using util function', () => {
        // Тук тестваме дали интеграцията със sortItems работи
        // Приемаме, че sortItems връща обработения масив
        const result = selectors.sortUsers('name', 'asc', 0, 10)(initialState);
        // Ако имената са Ivan, Maria, Georgi -> аsc би трябвало да е Georgi, Ivan, Maria
        expect(result[0].name).toBe('Georgi');
    });
});