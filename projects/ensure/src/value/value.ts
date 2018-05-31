// Dependencies:
import { isNotNull } from '../guards/not-null';
import { Guard } from '../guard/guard';

// Constants:
const VALUE_KEY = '__value_';

export function Value (...guards: Array<Guard<any> | Array<Guard<any>>>): PropertyDecorator {
    const guardsArray = getGuardsArray(guards);

    const getters = guardsArray.filter(c => c.isGetter);
    const setters = guardsArray.filter(c => !c.isGetter);

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

function getGuardsArray (guards: Array<Guard<any> | Array<Guard<any>>>): Array<Guard<any>> {
    // Handle old @Value([guardOne, guardTwo]) syntax:
    const [firstGuard] = guards;
    return Array.isArray(firstGuard) ? firstGuard as Array<Guard<any>> : guards as Array<Guard<any>>;
}
