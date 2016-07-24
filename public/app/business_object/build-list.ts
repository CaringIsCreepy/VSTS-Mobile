import { Injectable } from '@angular/core';
import { OAuthHttp } from '../core/oauth-http';
import { Build } from './build';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BuildFactory } from '../factory/build-factory';
import { BuildDefinition } from './build-definition';

@Injectable()
export class BuildList extends Array<Build> {
    constructor(private oAuthHttp: OAuthHttp,
                private buildFactory: BuildFactory,
                private window: Window) {
        super();
    }

    fetch(): Observable<BuildList>{
        let subject = new Subject<BuildList>();
        let server = this.window.localStorage.getItem('server');
        let teamProject = this.window.localStorage.getItem('project_name');
        let url = server + '/DefaultCollection/' + teamProject + '/_apis/build/builds?api-version=2.0';

        this.oAuthHttp.get(url).subscribe(res => {
            let buildList = res.json();

            for (var i = 0; i < buildList.value.length; i++) {
                let build = this.buildFactory.create();
                let buildDefinition = new BuildDefinition();
                buildDefinition.populate(buildList.value[i].definition);
                build.definition = buildDefinition;
                
                build.status = buildList.value[i].status;
                build.result = buildList.value[i].result;
                build.finishTime = buildList.value[i].finishTime;
                build.reason = buildList.value[i].reason;

                this.push(build);
            }
            
            subject.next(this);
        });

        return subject.asObservable();
    }
}