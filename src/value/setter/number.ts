// Dependencies:
import { EnsureError } from '../../ensure-error';

export function isNumber (value: any, key: string): number {
    value = +value;
    if (isNaN(value)) {
        throw new EnsureError(`'${key}' must be a number.`);
    }
    return value;
}
