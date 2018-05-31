// Utilities:
import { expect } from '../../test';

// Dependencies:
import { EnsureError } from '../ensure-error';

// Under test:
import { ensure } from './guard';

describe('ensure', () => {
    it('should set the "isGetter" property to false by default', () => {
        const func = ensure(function () {});

        expect(func.isGetter).to.equal(false);
    });

    it('should set the "isGetter" property to true', () => {
        const func = ensure(function () {}, { getter: true });

        expect(func.isGetter).to.equal(true);
    });
});
