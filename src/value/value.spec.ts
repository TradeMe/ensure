// Utilities:
import { expect } from 'chai';
import * as sinon from 'sinon';

// Dependencies:
import * as notNull from './getter/not-null';
import * as bool from './setter/bool';

// Under test:
import { Value } from './value';

describe('@Value', () => {
    it('should check is a value passes a test on a getter', () => {
        let isNotNull = sinon.spy(notNull, 'isNotNull');

        class Class {
            @Value(notNull.isNotNull) property: string;
        }

        let instance = new Class();

        instance.property = 'value';

        expect(instance.property).to.equal('value');
        expect(isNotNull.called).to.equal(true);
    });

    it('should check is a value passes a test on a setter', () => {
        let isBool = sinon.spy(bool, 'isBool');

        class Class {
            @Value(bool.isBool) property: string;
        }

        let instance = new Class();

        instance.property = 'true';

        expect(isBool.called).to.equal(true);
    });

    it('should turn a "null" string value to `null`', () => {
        class Class {
            @Value(bool.isBool) property: string;
        }

        let instance = new Class();

        instance.property = 'null';

        expect(instance.property).to.equal(null);
    });

    it('should ignore a `null` value', () => {
        class Class {
            @Value(bool.isBool) property: string;
        }

        let instance = new Class();

        instance.property = null;

        expect(instance.property).to.equal(null);
    });

    it('should ignore a `undefined` value', () => {
        class Class {
            @Value(bool.isBool) property: string;
        }

        let instance = new Class();

        instance.property = undefined;

        expect(instance.property).to.equal(undefined);
    });

    it('should still let you set and get values on an object', () => {
        class Class {
            @Value([]) property: string;
        }

        let instance = new Class();

        instance.property = 'value';

        expect(instance.property).to.equal('value');
    });
});
