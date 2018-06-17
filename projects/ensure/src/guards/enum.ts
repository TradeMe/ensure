// Dependencies:
import { EnsureError } from '../ensure-error';
import { ensure, Guard } from '../guard/guard';

export function isEnum <T> (enumValues: T): Guard<T> {
    // Prepare the enum values so lookups work in both directions,
    // with both number and string enums:
    const flipped = flipEnum(enumValues);
    const stripped = stripEnum(enumValues);

    return ensure((value: any, key: string): number | any => {
        const enumValue = stripped[value] != null ? stripped[value] : stripped[flipped[value]];
        if (enumValue == null) {
            throw new EnsureError(`
                "${value}" is not a valid value for '${key}'. You can use one of the following:
                    ${getValues<T>(enumValues)}
            `);
        }
        return enumValue;
    });
}

function flipEnum <T> (enumT: T): { [key: string]: any } {
    const flipped = {};
    Object.keys(enumT).forEach(key => {
        flipped[key] = enumT[key];
        flipped[enumT[key]] = key;
    });
    return flipped;
}

function stripEnum <T> (enumT: T): { [key: string]: any } {
    const stripped = {};
    Object.keys(enumT).forEach(key => {
        if (`${parseInt(key, 10)}` !== key) {
            stripped[key] = enumT[key];
        }
    });
    return stripped;
}

function getValues<T> (enumT: T): string {
    return Object.keys(enumT)
    .filter(key => isNaN(+key))
    .map(key => `"${key}"`)
    .join(',\n                    ');
}
