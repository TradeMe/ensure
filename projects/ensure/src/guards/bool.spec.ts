// Utilities:
import { expect } from '../../test';

// Dependencies:
import { EnsureError } from '../ensure-error';

// Under test:
import { isBool } from './bool';

describe('isBool', () => {
    it('should return `true` if the value is `true`', () => {
        expect(isBool(true, 'value')).to.equal(true);
    });

    it('should return `true` if the value is ""', () => {
        expect(isBool('', 'value')).to.equal(true);
    });

    it('should return `true` if the value is "true"', () => {
        expect(isBool('true', 'value')).to.equal(true);
    });

    it('should return `false` if the value is `false`', () => {
        expect(isBool(false, 'value')).to.equal(false);
    });

    it('should return `false` if the value is "false"', () => {
        expect(isBool('false', 'value')).to.equal(false);
    });

    it('should throw when given an invalid value', () => {
        expect(() => {
            isBool('not boolean', 'value');
        }).to.throw(new EnsureError(`
            "not boolean" is not a valid value for 'value'.
                The following values will evaluate to true: true, "true", "".
                The following values will evaluate to false: false, "false".
        `).message);
    });
});
