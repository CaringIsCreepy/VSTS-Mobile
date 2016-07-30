import {Component, Input, OnChanges} from '@angular/core';
import {Query} from '../business_object/query';
import {WorkItemList} from '../business_object/work-item-list';
import {WorkItemService} from '../service/work-item-service';

@Component({
    selector: "query-tile",
    templateUrl: "/app/tile/query-tile.html"
})
export class QueryTile implements OnChanges{
    @Input()
    query: Query;
    workItemSummary: string = '';
    workItemCount: number = 0;

    constructor(private workItemService: WorkItemService) {}

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
        this.workItemService.getList(this.query).subscribe(workItemList => {
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

                this.workItemCount += stateList[stateItem];
            }
        });
    }
}