// Utilities:
import { expect } from 'chai';

// Dependencies:
import { EnsureError } from '../../ensure-error';

// Under test:
import { isEnum } from './enum';

describe('@Value', () => {
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

            let value = isEnum<typeof Enum>(Enum)('value', 'value');

            expect(value).to.equal(Enum.value);
        });

        it('should return the value if it is a valid enum value', () => {
            enum Enum {
                value,
                another
            }

            let value = isEnum<typeof Enum>(Enum)(0, 'value');

            expect(value).to.equal(Enum.value);
        });
    });
});
