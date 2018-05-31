// Dependencies:
import { isNotNull } from '../guards/not-null';
import { Guard } from '../guard/guard';

// Constants:
const VALUE_KEY = '__value_';

export function Value (caster: Guard<any> | Array<Guard<any>>): PropertyDecorator {
    const casters = Array.isArray(caster) ? caster : [caster];

    const getters = casters.filter(c => c.isGetter);
    const setters = casters.filter(c => !c.isGetter);

    return (target: any, propertyKey: string) => {
        Object.defineProperty(target, propertyKey, {
            get: function () {
                const value = (Reflect as any).getMetadata(`${VALUE_KEY}${propertyKey}`, this);
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
                (Reflect as any).defineMetadata(`${VALUE_KEY}${propertyKey}`, castValue, this);
            }
        });
    };
}
