// Dependencies:
import { EnsureError } from '../ensure-error';
import { ensure } from '../guard/guard';

export function isEnum <T> (enumValues: T): Function {
    // This functions is explicitly *not* using the `=>` syntax so that
    // the `this` values is bound to the instance being checked.
    return ensure<T>((value: any, key: string): T => {
        const enumValue = enumValues[value];
        if (enumValue == null) {
            throw new EnsureError(`
                "${value}" is not a valid value for '${key}'. You can use one of the following:
                    ${getValues<T>(enumValues)}
            `);
        }
        return typeof enumValue === 'number' ? enumValue : value;
    });
}

function getValues<T> (enumT: T): string {
    return Object.keys(enumT)
    .filter(key => isNaN(+key))
    .map(key => `"${key}"`)
    .join(',\n                    ');
}
