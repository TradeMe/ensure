# @trademe/ensure - utility decorators for Angular applications.

[![npm version](https://img.shields.io/npm/v/@trademe/ensure.svg)](https://www.npmjs.com/package/@trademe/ensure)

## `@Singleton`:

> This decorator can be applied to `@Injectable` classes to ensure that they are instantiated only once. This is useful for stateful services that belong at the root of the application.

### Example:

```javascript
import { Singleton } from '@trademe/ensure';

@Singleton
@Injectable
export class MyStatefulService { }

let instance = new MyStatefulService(); // works:
let another = new MyStatefulService(); // throws!
```
___

## `@Value`:

> This decorator can be applied to properties on a class to ensure that they conform to rules when they are set. The rules also act as a mechanism for casting values from HTML attributes, which makes for nicer component APIs.

### Example:

```javascript
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

### Built in rules:

#### `isNotNull`

> Ensure that a value is not `null`. `isNotNull` is special in that it acts when *getting* the value, not setting it.

#### Example:

```javascript
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

> Ensure that a value is boolean. Also casts from `'true'` or `''` to `true` and `'false'` to `false`.

#### Example:

```javascript
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

> `isBool` is particularly useful for simplifying component APIs when combined with `@Input`.

#### Example:

```javascript
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

> Ensure that a value is a valid enum value.

#### Example:

```javascript
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

> Ensure that a value is a valid number.

#### Example:

```javascript
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
