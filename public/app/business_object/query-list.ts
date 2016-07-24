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

    fetch() : Observable<QueryList> {
        var subject = new Subject<QueryList>();

        var server = this.window.localStorage.getItem('server');
        let teamProject = this.window.localStorage.getItem('project_name');
        let url = server + '/DefaultCollection/' + teamProject + '/_apis/wit/queries?$depth=1&api-version=2.2';

        this.oAuthHttp.get(url).subscribe(res => {
            let queryList = res.json();

            for (var i = 0; i < queryList.value.length; i++) {
                
                var query = new Query(this.oAuthHttp);;

                this.push(query);
            }
            
        });

        return subject.asObservable();
    }
}