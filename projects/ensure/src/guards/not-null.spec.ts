// Utilities:
import { expect } from '../../test';

// Dependencies:
import { EnsureError } from '../ensure-error';

// Under test:
import { isNotNull } from './not-null';

describe('isNotNull', () => {
    it('should throw if it the value is `null`', () => {
        expect(() => {
            isNotNull(null, 'value');
        }).to.throw(new EnsureError(`
            'value' must not be "null" or "undefined".
        `).message);
    });

    it('should throw if it the value is `undefined`', () => {
        expect(() => {
            isNotNull(undefined, 'value');
        }).to.throw(new EnsureError(`
            'value' must not be "null" or "undefined".
        `).message);
    });

    it('should return the value if it is not `null` or `undefined`', () => {
        const value = isNotNull('not null', 'value');

        expect(value).to.equal('not null');
    });
});
