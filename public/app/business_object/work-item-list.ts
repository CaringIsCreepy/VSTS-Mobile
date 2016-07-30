import { Injectable } from '@angular/core';
import { WorkItem } from './work-item';

@Injectable()
export class WorkItemList extends Array<WorkItem> {
    constructor() {
        super();
    }

}