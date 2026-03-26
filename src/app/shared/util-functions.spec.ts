import { sortItems } from "./util-functions";

describe('Util Tests', () => {
    const stringPropsArray = [{ stringProperty: 'r' }, { stringProperty: 'd' }, { stringProperty: 'c' }, { stringProperty: 'c' }];
    const numberPropsArray = [{ numberProperty: 7 }, { numberProperty: 4 }, { numberProperty: 3 }, { numberProperty: 0 }];

    it('should sort by string property ASC with limitation', () => {
        const sorted = sortItems('asc', stringPropsArray, 'stringProperty', 0, 2);
        expect(sorted.length).toBe(2);
        expect(sorted[0].stringProperty).toBe('c');
    });

    it('should sort by string property DESC with limitation', () => {
        const sorted = sortItems('desc', stringPropsArray, 'stringProperty', 0, 2);
        expect(sorted.length).toBe(2);
        expect(sorted[0].stringProperty).toBe('r');
    });

    it('should sort by number property ASC with limitation', () => {
        const sorted = sortItems('asc', numberPropsArray, 'numberProperty', 0, 3);
        expect(sorted.length).toBe(3);
        expect(sorted[0].numberProperty).toBe(0);
    });
    it('should sort by number property DESC with limitation', () => {
        const sorted = sortItems('desc', numberPropsArray, 'numberProperty', 0, 3);
        expect(sorted.length).toBe(3);
        expect(sorted[0].numberProperty).toBe(7);
    });
});