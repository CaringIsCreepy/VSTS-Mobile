import {Injectable} from 'angular2/core';
import {OAuthHttp} from '../core/oauth-http';
import {TeamProjectList} from '../business_object/team-project-list';
import {TeamProjectFactory} from '../factory/team-project-factory';

@Injectable()
export class TeamProjectListFactory {
    constructor(private window: Window,
                private oAuthHttp: OAuthHttp,
                private teamProjectFactory: TeamProjectFactory) {
    }
    
    create(): TeamProjectList {
        return new TeamProjectList(this.oAuthHttp, this.window, this.teamProjectFactory);
    }
}