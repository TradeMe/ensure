// Utilities:
import { expect } from '../../test';

// Dependencies:
import { EnsureError } from '../ensure-error';

// Under test:
import { isNumber } from './number';

describe('isNumber', () => {
    it('should throw if it the value is not a number', () => {
        expect(() => {
            isNumber('not number', 'value');
        }).to.throw(new EnsureError(`
            'value' must be a number.
        `).message);
    });

    it('should return the value if it is a number', () => {
        const value = isNumber(1, 'value');

        expect(value).to.equal(1);
    });
});
