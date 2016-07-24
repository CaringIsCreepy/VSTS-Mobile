import { ReflectiveInjector } from '@angular/core';

export class ObjectFactory {
    getObject<T>() : T {
        return <T>{};
    }
}