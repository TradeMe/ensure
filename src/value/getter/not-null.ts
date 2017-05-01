// Dependencies:
import { EnsureError } from '../../ensure-error';

export function isNotNull (value: any, key: any): any {
    if (value == null) {
        throw new EnsureError(`'${key}' must not be "null" or "undefined".`);
    }
    return value;
}
