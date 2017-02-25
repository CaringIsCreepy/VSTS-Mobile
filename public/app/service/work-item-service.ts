import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
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
        let subject = new Subject<WorkItemList>();
        let server = this.window.localStorage.getItem('server');
        let teamProject = this.window.localStorage.getItem('project_name');
        let queryUrl = server + '/DefaultCollection/' + teamProject + '/_apis/wit/wiql/' + query.id + '?api-version=1.0';

        this.oAuthHttp.get(queryUrl).subscribe(res => {
            let result = res.json();
            let idList = new Array<number>();

            result.workItems.forEach(workItemJson => {
                idList.push(workItemJson.id);
            });

            this.getWorkItemList(idList).subscribe((list) => {
                subject.next(list);
            });
        });

        return subject.asObservable();
    }

    getListFromWIQL(wiql: string): Observable<WorkItemList> {
        let subject = new Subject<WorkItemList>();
        let server = this.window.localStorage.getItem('server');
        let teamProject = this.window.localStorage.getItem('project_name');
        let queryUrl = server + '/DefaultCollection/' + teamProject + '/_apis/wit/wiql?api-version=1.0';

        this.oAuthHttp.post(queryUrl, {query: wiql}).subscribe(res => {
            let result = res.json();
            let idList = new Array<number>();

            result.workItems.forEach(workItemJson => {
                idList.push(workItemJson.id);
            });

            this.getWorkItemList(idList).subscribe((list) => {
                subject.next(list);
            });
        });

        return subject.asObservable();
    }

    getWorkItemList(idList: Array<number>) : Observable<WorkItemList> {
        let returnValue = new WorkItemList();
        let subject = new BehaviorSubject<WorkItemList>(returnValue);

        if (idList.length > 0) {
            let server = this.window.localStorage.getItem('server');
            
            let workItemUrl = server + '/DefaultCollection/_apis/wit/WorkItems?ids=' + idList.join() + '&fields=System.Id,System.WorkItemType,System.Title,System.AssignedTo,System.State&api-version=1.0';

            this.oAuthHttp.get(workItemUrl).subscribe(res => {
                let result = res.json();

                result.value.forEach(workItemJson => {
                    let workItem = new WorkItem();
                    workItem.populate(workItemJson);
                    returnValue.push(workItem);
                });

                subject.next(returnValue);
            });
        }

        return subject.asObservable();
    }

    getItem(id: number): Observable<WorkItem> {
        let subject = new Subject<WorkItem>();
        let server = this.window.localStorage.getItem('server');
        let teamProject = this.window.localStorage.getItem('project_name');
        let workItemUrl = server + "/DefaultCollection/_apis/wit/workitems/" + id + "?api-version=1.0";

        this.oAuthHttp.get(workItemUrl).subscribe(res => {
            let result = res.json();

            let workItem = new WorkItem();

            workItem.populate(result);

            subject.next(workItem);
        }, error => {
            subject.error(error);
        });

        return subject.asObservable();
    }
}