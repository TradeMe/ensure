// Utilities:
import { expect } from '../../test';

// Dependencies:
import { isBool } from '../guards/bool';
import { isNotNull } from '../guards/not-null';

// Under test:
import { Value } from './value';

describe('@Value', () => {
    it('should check is a value passes a test on a getter', () => {
        class Class {
            @Value(isNotNull) property: string;
        }

        const instance = new Class();

        expect(() => {
            return instance.property;
        }).to.throw(`'property' must not be "null" or "undefined".`);

        expect(() => {
            instance.property = 'value';
            return instance.property;
        }).to.not.throw();
    });

    it('should check is a value passes a test on a setter', () => {
        class Class {
            @Value(isBool) property: string;
        }

        const instance = new Class();

        expect(() => {
            return instance.property;
        }).to.not.throw();

        expect(() => {
            instance.property = '6';
        }).to.throw(`"6" is not a valid value for 'property'`);
    });

    it('should turn a "null" string value to `null`', () => {
        class Class {
            @Value(isBool) property: string;
        }

        const instance = new Class();

        instance.property = 'null';

        expect(instance.property).to.equal(null);
    });

    it('should ignore a `null` value', () => {
        class Class {
            @Value(isBool) property: string;
        }

        const instance = new Class();

        instance.property = null;

        expect(instance.property).to.equal(null);
    });

    it('should ignore a `undefined` value', () => {
        class Class {
            @Value(isBool) property: string;
        }

        const instance = new Class();

        instance.property = undefined;

        expect(instance.property).to.equal(undefined);
    });

    it('should still let you set and get values on an object', () => {
        class Class {
            @Value([]) property: string;
        }

        const instance = new Class();

        instance.property = 'value';

        expect(instance.property).to.equal('value');
    });

    it('should handle an array of guards', () => {
        class Class {
            @Value([isNotNull, isBool]) property: string;
        }

        const instance = new Class();

        expect(() => {
            instance.property = 'null';
            return instance.property;
        }).to.throw(`'property' must not be "null" or "undefined"`);

        instance.property = 'true';

        expect(instance.property).to.equal(true);
    });

    it('should handle multiple guards', () => {
        class Class {
            @Value(isNotNull, isBool) property: string;
        }

        const instance = new Class();

        expect(() => {
            instance.property = 'null';
            return instance.property;
        }).to.throw(`'property' must not be "null" or "undefined"`);

        instance.property = 'true';

        expect(instance.property).to.equal(true);
    });
});
