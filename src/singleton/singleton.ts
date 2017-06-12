// Dependencies:
import { Injectable } from '@angular/core';
import { EnsureError } from '../ensure-error';
import { ResettableSingleton } from './resettable-singleton';

export function Singleton (): (injectable: any) => any {
    return function (injectable: any): any {
        let singleton = createSingleton(injectable);
        setPrototype(injectable, singleton);
        setMetadata(injectable, singleton);
        setName(injectable, singleton);

        return singleton;
    };
}

function createSingleton (injectable: any): ResettableSingleton {
    let instantiated: boolean = null;
    function singleton () {
        if (!instantiated) {
            instantiated = true;
            return injectable.apply(this, arguments);
        }
        throw new EnsureError(`
            ${injectable.name} is a singleton and must not be instantiated multiple times.
        `);
    };
    (<ResettableSingleton>singleton)._reset = () => instantiated = false;
    return singleton;
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
