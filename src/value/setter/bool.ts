// Dependencies:
import { EnsureError } from '../../ensure-error';

export function isBool (value: any, key: string): boolean {
    if (value === true || value === false) {
        return value;
    }
    if (value === 'true' || value === '') {
        return true;
    }
    if (value === 'false') {
        return false;
    }

    throw new EnsureError(`
        "${value}" is not a valid value for '${key}'.
            The following values will evaluate to true: true, "true", "".
            The following values will evaluate to false: false, "false".
    `);
}
