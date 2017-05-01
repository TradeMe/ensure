// Constants:
const VALUE_KEY = '__value_';

// Dependencies:
import { isNotNull } from './getter/not-null';

export function Value (caster: Function | Array<Function>): PropertyDecorator {
    let casters = Array.isArray(caster) ? caster : [caster];

    let getters = casters.filter(caster => caster === isNotNull);
    let setters = casters.filter(caster => caster !== isNotNull);

    return (target: any, propertyKey: string) => {
        Object.defineProperty(target, propertyKey, {
            get: function () {
                let value = Reflect.getMetadata(`${VALUE_KEY}${propertyKey}`, this);
                getters.forEach(getter => {
                    getter.call(this, value, propertyKey);
                });
                return value;
            },
            set: function (value) {
                let castValue = value;

                if (castValue === 'null') {
                    castValue = null;
                }

                if (castValue != null) {
                    setters.forEach(setter => {
                        castValue = setter.call(this, castValue, propertyKey);
                    });
                }
                Reflect.defineMetadata(`${VALUE_KEY}${propertyKey}`, castValue, this);
            }
        });
    };
}
