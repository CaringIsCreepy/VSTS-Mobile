import {Injectable} from '@angular/core';
import {TeamProject} from '../business_object/team-project';
import {OAuthHttp} from '../core/oauth-http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {TeamProjectList} from '../business_object/team-project-list';

@Injectable()
export class TeamProjectService {
    constructor(private window: Window,
                private oAuthHttp: OAuthHttp) {
    }


    getList(): Observable<TeamProjectList> {
        let subject = new Subject<TeamProjectList>();
        var returnValue = new TeamProjectList();
        let server = this.window.localStorage.getItem("server");
        
        let url = server + "/DefaultCollection/_apis/projects?api-version=1.0";
        this.oAuthHttp.get(url).subscribe(res => {
            let projects = res.json();
            
            for (let i = 0; i < projects.count; i++) {
                let teamProject = new TeamProject();
                
                teamProject.id = projects.value[i].id;
                teamProject.name = projects.value[i].name;
                teamProject.description = projects.value[i].description;
                
                returnValue.push(teamProject);
            }
            
            subject.next(returnValue);
        }, error => {
            subject.error(error);
        });
        
        return subject.asObservable();
    }
}