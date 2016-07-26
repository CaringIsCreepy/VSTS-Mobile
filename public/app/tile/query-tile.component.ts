import {Component, Input} from '@angular/core';
import {Query} from '../business_object/query';
import {WorkItemList} from '../business_object/work-item-list';

@Component({
    selector: "query-tile",
    templateUrl: "/app/tile/query-tile.html"
})
export class QueryTile {
    @Input()
    query: Query;
    workItemSummary: string = '';

    constructor(private workItemList: WorkItemList) {}

    ngOnChanges(changes: { [propertyName: string]: any }) {
        for (let propName in changes) {
            if (propName === 'query') {
                if (changes['query'].currentValue instanceof Query) {
                    this.populateWorkItemInfo();
                }
            }
        }
    }

    populateWorkItemInfo() {
        this.workItemList.fetch(this.query).subscribe(workItemList => {
            let stateList = []; 
            let stateCount: number = 0;
            let runningStateCount: number = 0;

            workItemList.forEach(workItem => {
                if (workItem.state in stateList) {
                    stateList[workItem.state]++;
                }
                else {
                    stateCount++;
                    stateList[workItem.state] = 1;
                }
            });

            for (let stateItem in stateList) {
                runningStateCount++;
                this.workItemSummary += stateList[stateItem] + ' ' + stateItem;
                if (runningStateCount != stateCount) {
                    this.workItemSummary += ', ';
                }
            }
        });
    }
}