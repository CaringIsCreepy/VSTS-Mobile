import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {QueryList} from '../business_object/query-list';
import {Query} from '../business_object/query';
import {OAuthHttp} from '../core/oauth-http';

@Injectable()
export class QueryService {
    constructor (private window: Window,
                private oAuthHttp :OAuthHttp){}

    getListAsFlat() : Observable<QueryList> {
        var subject = new Subject<QueryList>();
        var returnValue = new QueryList();

        var server = this.window.localStorage.getItem('server');
        let teamProject = this.window.localStorage.getItem('project_name');
        let url = server + '/DefaultCollection/' + teamProject + '/_apis/wit/queries?$depth=1&api-version=2.2';

        this.oAuthHttp.get(url).subscribe(res => {
            let queryList = res.json();

            queryList.value.forEach(queryJson => {
                if (queryJson.isFolder) {
                    if (queryJson.hasChildren) {
                        queryJson.children.forEach(childQuery => {
                            var query = new Query();

                            query.populate(childQuery);

                            returnValue.push(query);
                        });
                    }
                }
                else {
                    var query = new Query();

                    query.populate(queryJson);

                    returnValue.push(query);
                }
            });

            subject.next(returnValue);
        });

        return subject.asObservable();
    }
}