import { BuildDefinition } from './build-definition';

export class Build {
    definition: BuildDefinition;
    status: string;
    result: string;
    finishTime: Date;
}