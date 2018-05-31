// Dependencies:
import { GuardConfig } from './guard-config';

export type GuardFunction<T = any> = (value: any, key: string) => T;
export type Guard<T = any> = { isGetter: boolean } & GuardFunction<T>;

export function ensure <T> (guard: GuardFunction, config?: GuardConfig): Guard<T> {
    Object.defineProperty(guard, 'isGetter', {
        get: function () {
            return !!config && config.getter;
        }
    });
    return guard as Guard;
}
