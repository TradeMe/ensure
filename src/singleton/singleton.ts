// Dependencies:
import { EnsureError } from '../ensure-error';
import { Injectable } from '@angular/core';

export function Singleton (): (injectable: any) => any {
    return function (injectable: any): any {
        let singleton = createSingleton(injectable);
        setPrototype(injectable, singleton);
        setMetadata(injectable, singleton);
        setName(injectable, singleton);

        return singleton;
    };
}

// @Singleton must appear before the @Injectable decorator on the class.
// This is so the service injection is applied to the original class.
function checkInjectable (injectable): void {
    let annotations = Reflect.getOwnMetadata('annotations', injectable);
    let isInjectable = annotations && annotations.some(ann => ann.constructor === Injectable);
    if (!isInjectable) {
        throw new EnsureError(`
            @Singleton must appear before @Injectable:

                @Singleton()
                @Injectable()
                export class ${injectable.name} { }
        `);
    }
}

function createSingleton (injectable): Function {
    let instantiated: boolean = null;
    return function singleton () {
        if (!instantiated) {
            checkInjectable(injectable);
            instantiated = true;
            this._reset = () => instantiated = false;
            return injectable.apply(this, arguments);
        }
        throw new EnsureError(`
            ${injectable.name} is a singleton and must not be instantiated multiple times.
        `);
    }
}

function setMetadata (injectable, singleton): void {
    for (let key of Reflect.getOwnMetadataKeys(injectable)) {
        let metadata = Reflect.getOwnMetadata(key, injectable);
        Reflect.defineMetadata(key, metadata, singleton);
    }
}

function setName (injectable, singleton): void {
    let fnName = `${injectable.name}Singleton`;
    singleton.prototype.toString = () => fnName;
    Object.defineProperty(singleton, 'name', { value: fnName });
}

function setPrototype (injectable, singleton): void {
    singleton.prototype = Object.create(injectable.prototype);
}
