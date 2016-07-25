import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Query } from './query';
import { OAuthHttp } from '../core/oauth-http';

@Injectable()
export class QueryList extends Array<Query> {
    constructor(private oAuthHttp: OAuthHttp,
                private window: Window) {
        super();
    }

    fetchListAsFlat() : Observable<QueryList> {
        var subject = new Subject<QueryList>();

        var server = this.window.localStorage.getItem('server');
        let teamProject = this.window.localStorage.getItem('project_name');
        let url = server + '/DefaultCollection/' + teamProject + '/_apis/wit/queries?$depth=1&api-version=2.2';

        this.oAuthHttp.get(url).subscribe(res => {
            let queryList = res.json();

            queryList.value.forEach(queryJson => {
                if (queryJson.isFolder) {
                    if (queryJson.hasChildren) {
                        queryJson.children.forEach(childQuery => {
                            var query = new Query(this.oAuthHttp);

                            query.populate(childQuery);

                            this.push(query);
                        });
                    }
                }
                else {
                    var query = new Query(this.oAuthHttp);

                    query.populate(queryJson);

                    this.push(query);
                }
            });

            subject.next(this);
        });

        return subject.asObservable();
    }
}