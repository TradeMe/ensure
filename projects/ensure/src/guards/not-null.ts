// Dependencies:
import { EnsureError } from '../ensure-error';
import { ensure } from '../guard/guard';

export const isNotNull = ensure((value: any, key: any): any => {
    if (value == null) {
        throw new EnsureError(`
            '${key}' must not be "null" or "undefined".
        `);
    }
    return value;
}, {
    getter: true
});
