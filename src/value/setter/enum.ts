// Dependencies:
import { EnsureError } from '../../ensure-error';

export function isEnum<T> (enumValues: T) {
    // This functions is explicitly *not* using the `=>` syntax so that
    // the `this` values is bound to the instance being checked.
    return function (value: any, key: string): any {
        let enumValue = enumValues[value];
        if (enumValue == null) {
            throw new EnsureError(`
                "${value}" is not a valid value for '${key}'. You can use one of the following:
                    ${getValues<T>(enumValues)}
            `);
        }
        return typeof enumValue === 'number' ? enumValue : value;
    };
}

function getValues<T> (enumT: T): string {
    return Object.keys(enumT)
    .filter(key => isNaN(+key))
    .map(key => `"${key}"`)
    .join(',\n                    ');
}
