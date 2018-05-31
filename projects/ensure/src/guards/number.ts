// Dependencies:
import { EnsureError } from '../ensure-error';
import { ensure } from '../guard/guard';

export const isNumber = ensure((value: any, key: string): number => {
    value = +parseFloat(value);
    if (isNaN(value)) {
        throw new EnsureError(`
            '${key}' must be a number.
        `);
    }
    return value;
});
