import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Query } from './query';
import { WorkItem } from './work-item';
import { OAuthHttp } from '../core/oauth-http';

@Injectable()
export class WorkItemList extends Array<WorkItem> {
    constructor(private oAuthHttp: OAuthHttp,
        private window: Window) {
        super();
    }

    fetch(query: Query): Observable<WorkItemList> {
        var subject = new Subject<WorkItemList>();

        var server = this.window.localStorage.getItem('server');
        let teamProject = this.window.localStorage.getItem('project_name');
        let queryUrl = server + '/DefaultCollection/' + teamProject + '/_apis/wit/wiql/' + query.id + '?api-version=1.0';

        this.oAuthHttp.get(queryUrl).subscribe(res => {
            var result = res.json();
            var idList = new Array<number>();

            result.workItems.forEach(workItemJson => {
                idList.push(workItemJson.id);
            });

            let queryUrl = server + '/DefaultCollection/_apis/wit/WorkItems?ids=' + idList.join() + '&fields=System.Id,System.WorkItemType,System.Title,System.AssignedTo,System.State&api-version=1.0';

            this.oAuthHttp.get(queryUrl).subscribe(res => {
                var result = res.json();

                result.value.forEach(workItemJson => {
                    var workItem = new WorkItem();
                    workItem.populate(workItemJson);
                    this.push(workItem);
                });

                subject.next(this);
            });
        });

        return subject.asObservable();
    }
}