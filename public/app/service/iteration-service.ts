import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {OAuthHttp} from '../core/oauth-http';
import {BuildDefinition} from '../business_object/build-definition';
import {IterationList} from '../business_object/iteration-list';
import {Iteration} from '../business_object/iteration';

@Injectable()
export class IterationService {
    constructor(private window: Window,
                private oAuthHttp: OAuthHttp) {
    }

    getList() : Observable<IterationList> {
        let subject = new Subject<IterationList>();
        let returnValue = new IterationList();
        let server = this.window.localStorage.getItem('server');
        let teamProjectName = this.window.localStorage.getItem('project_name');
        let url = server + '/DefaultCollection/' + teamProjectName + '/_apis/work/teamsettings/iterations?api-version=v2.0-preview';

        this.oAuthHttp.get(url).subscribe(res => {
            let iterationList = res.json();

            for (var i = 0; i < iterationList.value.length; i++) {
                let iteration = new Iteration();
                iteration.populate(iterationList.value[i])

                returnValue.push(iteration);
            }
            
            subject.next(returnValue);
        });

        return subject.asObservable();
    }

    getById(id: string) : Observable<Iteration> {
        let subject = new Subject<Iteration>();
        let returnValue = new Iteration();
        let server = this.window.localStorage.getItem('server');
        let teamProjectName = this.window.localStorage.getItem('project_name');
        let url = server + `/DefaultCollection/${teamProjectName}/_apis/work/teamsettings/iterations/${id}?api-version=v2.0-preview`;

        this.oAuthHttp.get(url).subscribe(res => {
            let iterationJson = res.json();

            returnValue.populate(iterationJson);
            
            subject.next(returnValue);
        });

        return subject.asObservable();
    }
}