import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {OAuthHttp} from '../core/oauth-http';
import {Query} from '../business_object/query';
import {WorkItemList} from '../business_object/work-item-list';
import {WorkItem} from '../business_object/work-item';

@Injectable()
export class WorkItemService {
    constructor(private window: Window,
                private oAuthHttp: OAuthHttp){}

    getList(query: Query): Observable<WorkItemList> {
        var subject = new Subject<WorkItemList>();
        var returnValue = new WorkItemList();
        var server = this.window.localStorage.getItem('server');
        let teamProject = this.window.localStorage.getItem('project_name');
        let queryUrl = server + '/DefaultCollection/' + teamProject + '/_apis/wit/wiql/' + query.id + '?api-version=1.0';

        this.oAuthHttp.get(queryUrl).subscribe(res => {
            var result = res.json();
            var idList = new Array<number>();

            result.workItems.forEach(workItemJson => {
                idList.push(workItemJson.id);
            });

            let workItemUrl = server + '/DefaultCollection/_apis/wit/WorkItems?ids=' + idList.join() + '&fields=System.Id,System.WorkItemType,System.Title,System.AssignedTo,System.State&api-version=1.0';

            this.oAuthHttp.get(workItemUrl).subscribe(res => {
                var result = res.json();

                result.value.forEach(workItemJson => {
                    var workItem = new WorkItem();
                    workItem.populate(workItemJson);
                    returnValue.push(workItem);
                });

                subject.next(returnValue);
            });
        });

        return subject.asObservable();
    }

    getItem(id: number): Observable<WorkItem> {
        let subject = new Subject<WorkItem>();
        let server = this.window.localStorage.getItem('server');
        let teamProject = this.window.localStorage.getItem('project_name');
        let workItemUrl = server + "/DefaultCollection/" + teamProject + "/_apis/wit/workitems/" + id + "?api-version=1.0";

        this.oAuthHttp.get(workItemUrl).subscribe(res => {
            let result = res.json();

            let workItem = new WorkItem();

            workItem.populate(result.value);

            subject.next(workItem);
        });

        return subject.asObservable();
    }
}