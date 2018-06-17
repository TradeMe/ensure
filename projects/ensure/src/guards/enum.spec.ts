// Utilities:
import { expect } from '../../test';

// Dependencies:
import { EnsureError } from '../ensure-error';

// Under test:
import { isEnum } from './enum';

describe('isEnum', () => {
    it('should throw if it the value is not a valid enum value', () => {
        enum Enum {
            value,
            another
        }

        expect(() => {
            isEnum<typeof Enum>(Enum)('not enum value', 'value');
        }).to.throw(new EnsureError(`
            "not enum value" is not a valid value for 'value'. You can use one of the following:
                "value",
                "another"
        `).message);
    });

    it('should return the value if it is a valid enum key', () => {
        enum Enum {
            value,
            another
        }

        const value = isEnum<typeof Enum>(Enum)('value', 'value');

        expect(value).to.equal(Enum.value);
    });

    it('should return the value if it is a valid enum value', () => {
        enum Enum {
            value,
            another
        }

        const value = isEnum<typeof Enum>(Enum)(0, 'value');

        expect(value).to.equal(Enum.value);
    });

    it('should return the value if it is a valid string enum key', () => {
        enum Enum {
            value = 'VALUE'
        }

        const value = isEnum<typeof Enum>(Enum)('value', 'value');

        expect(value).to.equal(Enum.value);
    });

    it('should return the value if it is a valid string enum value', () => {
        enum Enum {
            value = 'VALUE'
        }

        const value = isEnum<typeof Enum>(Enum)('VALUE', 'value');

        expect(value).to.equal(Enum.value);
    });

    it('should return the value if it is a valid string enum key that starts with a number', () => {
        enum Enum {
            '1x1'
        }

        const value = isEnum<typeof Enum>(Enum)('1x1', '1x1');

        expect(value).to.equal(Enum['1x1']);
    });

    it('should return the value if it is a valid string enum value that starts with a number', () => {
        enum Enum {
            '1x1'
        }

        const value = isEnum<typeof Enum>(Enum)(0, '1x1');

        expect(value).to.equal(Enum['1x1']);
    });
});
