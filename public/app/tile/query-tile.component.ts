import {Component, Input} from '@angular/core';
import {Query} from '../business_object/query';
import {WorkItemList} from '../business_object/work-item-list';

@Component({
    selector: "query-tile",
    templateUrl: "/app/tile/query-tile.html"
})
export class QueryTile {
    constructor(private workItemList: WorkItemList) {}

    @Input()
    query: Query;

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
            
        });
    }
}