import { Injectable } from '@angular/core';
import { Iteration } from './iteration';

@Injectable()
export class IterationList extends Array<Iteration> {
    constructor() {
        super();
    }

}