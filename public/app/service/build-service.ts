import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {OAuthHttp} from '../core/oauth-http';
import {BuildDefinition} from '../business_object/build-definition';
import {BuildList} from '../business_object/build-list';
import {Build} from '../business_object/build';

@Injectable()
export class BuildService {
    constructor(private window: Window,
                private oAuthHttp: OAuthHttp) {
    }

    getList() : Observable<BuildList> {
        let subject = new Subject<BuildList>();
        let returnValue = new BuildList();
        let server = this.window.localStorage.getItem('server');
        let teamProject = this.window.localStorage.getItem('project_name');
        let url = server + '/DefaultCollection/' + teamProject + '/_apis/build/builds?api-version=2.0';

        this.oAuthHttp.get(url).subscribe(res => {
            let buildList = res.json();

            for (var i = 0; i < buildList.value.length; i++) {
                let build = new Build();
                let buildDefinition = new BuildDefinition();
                buildDefinition.populate(buildList.value[i].definition);
                build.definition = buildDefinition;
                
                build.status = buildList.value[i].status;
                build.result = buildList.value[i].result;
                build.finishTime = buildList.value[i].finishTime;
                build.reason = buildList.value[i].reason;

                returnValue.push(build);
            }
            
            subject.next(returnValue);
        });

        return subject.asObservable();
    }
}