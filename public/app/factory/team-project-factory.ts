import {TeamProject} from '../business_object/team-project';

export class TeamProjectFactory {
    create(): TeamProject {
        return new TeamProject();
    }
}