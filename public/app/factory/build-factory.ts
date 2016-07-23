import {Build} from '../business_object/build';

export class BuildFactory {
    create(): Build {
        return new Build();
    }
}