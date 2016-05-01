import {OAuthHttp} from '../core/oauth-http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {TeamProject} from './team-project';
import {TeamProjectFactory} from '../factory/team-project-factory';

export class TeamProjectList extends Array<TeamProject> {
    constructor(private oAuthHttp: OAuthHttp,
                private window: Window,
                private teamProjectFactory: TeamProjectFactory) {
        super();
    }
    
    fetch(): Observable<TeamProjectList> {
        let subject = new Subject();
        let server = this.window.localStorage.getItem("server");
        
        let url = server + "/DefaultCollection/_apis/projects?api-version=1.0";
        this.oAuthHttp.get(url).subscribe(res => {
            let projects = res.json();
            
            for (let i = 0; i < projects.count; i++) {
                let teamProject = this.teamProjectFactory.create();
                
                teamProject.id = projects.value[i].id;
                teamProject.name = projects.value[i].name;
                teamProject.description = projects.value[i].description;
                
                this.push(teamProject);
            }
            
            subject.next(this);
        }, error => {
            subject.error(error);
        });
        
        return subject.asObservable();
    }
}