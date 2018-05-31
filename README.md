# @trademe/ensure - utility decorators for Angular applications.

[![npm version](https://img.shields.io/npm/v/@trademe/ensure.svg)](https://www.npmjs.com/package/@trademe/ensure)

## `@Value`:

This decorator can be applied to properties on a class to ensure that they conform to rules when they are set. The rules also act as a mechanism for casting values from HTML attributes, which makes for nicer component APIs.

### Example:

```typescript
import { Value } from '@trademe/ensure';

export class MyClass {
  @Value(isOne) mustBeOne: number;
  @Value([isString, isLengthFive]) verySpecificString: string;
}

export function isOne (value: any) {
    if (value === 1) {
        return value;
    }
    throw new Error();
}

export function isString (value: string) {
    if (typeof value === 'string') {
        return value;
    }
    throw new Error();
}

export function isLengthFive (value: string) {
    if (value.length === 5) {
        return value;
    }
    throw new Error();
}
```

### Built in guards:

#### `isNotNull`

Ensure that a value is not `null`. `isNotNull` is special in that it acts when *getting* the value, not setting it.

#### Example:

```typescript
import { isNotNull } from '@trademe/ensure';

export class MyClass {
    @Value(isNotNull) mustNotBeNull: boolean;
}

let instance = new MyClass();
instance.mustNotBeNull = true; // works
instance.mustNotBeNull = null; // works
console.log(instance.mustNotBeNull): // throws!
```

#### `isBool`

Ensure that a value is boolean. Also casts from `'true'` or `''` to `true` and `'false'` to `false`.

#### Example:

```typescript
import { isBool } from '@trademe/ensure';

export class MyClass {
    @Value(isBool) mustBeBoolean: boolean;
}

let instance = new MyClass();
instance.mustBeBoolean = true; // works
instance.mustBeBoolean = 'hello'; // throws!
instance.mustBeBoolean = 'false'; // works
console.log(instance.mustBeBoolean) // false
```

`isBool` is particularly useful for simplifying component APIs when combined with `@Input`.

#### Example:

```typescript
import { isBool } from '@trademe/ensure';

@Component({ ... })
export class MyComponent {
    @Input() @Value(isBool) mustBeBoolean: boolean;
}
```

```html
<my-component
  mustBeBoolean><!-- No more pesky ="true"! -->
</my-component>
```

#### `isEnum`

Ensure that a value is a valid enum value.

#### Example:

```typescript
import { isEnum } from '@trademe/ensure';

export enum MyEnum {
    foo,
    bar
}

export class MyClass {
    @Value(isEnum<typeof MyEnum>(MyEnum)) mustBeEnum: MyEnum;
}

let instance = new MyClass();
instance.mustBeEnum = 'foo'; // works
console.log(instance.mustBeEnum); // 0
instance.mustBeEnum = 'bar'; // works!
console.log(instance.mustBeEnum); // 1
instance.mustBeEnum = 'baz'; // throws!
```

#### `isNumber`

Ensure that a value is a valid number.

#### Example:

```typescript
import { isNumber } from '@trademe/ensure';

export class MyClass {
    @Value(isNumber) mustBeNumber: number;
}

let instance = new MyClass();
instance.mustBeNumber = 5; // works
console.log(instance.mustBeNumber); // 5
instance.mustBeNumber = '1.33'; // works!
console.log(instance.mustBeNumber); // 1.33
instance.mustBeNumber = 'baz'; // throws!
```

### Custom guards:

Sometimes it is useful to write your own guards. To do that, we provide an `ensure` method, which you need to wrap your rule with:

```typescript
import { ensure, EnsureError } from '@trademe/ensure';

export const isInt = ensure((value: any, key: string): number => {
    const num = +parseInt(value, 10);
    if (isNaN(num)) {
        throw new EnsureError(`
            '${key}' must be a number.
        `);
    }
    if (`${num}` !== `${value}`) {
        throw new EnsureError(`
            '${key}' must be an integer.
        `);
    }
    return num;
});
```

If you need to do something more complicated, say with arguments, the *inner* function should be wrapped with `ensure`:

```typescript

import { ensure, EnsureError } from '@trademe/ensure';

export function isMutuallyExclusive (mutuallyExclusiveKey: string): Function {
    return ensure((value: any, key: string): any {
        let mutuallyExclusiveValue = this[mutuallyExclusiveKey];
        if (mutuallyExclusiveValue != null && mutuallyExclusiveValue !== false) {
            throw new EnsureError(`
               "${key}" and "${mutuallyExclusiveKey}" cannot be used at the same time.
            `);
        }
        return value;
    });
}
```