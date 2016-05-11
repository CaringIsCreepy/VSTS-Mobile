import {Component} from 'angular2/core';
import {Router, RouteParams} from 'angular2/router';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Settings} from '../settings';
import {Login} from '../business_object/login';
import {User} from '../business_object/user';
import {TeamProject} from '../business_object/team-project';
import {TeamProjectList} from '../business_object/team-project-list';
import {TeamProjectListFactory} from '../factory/team-project-list-factory';
import {MdSpinner} from '@angular2-material/progress-circle';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MdButton} from '@angular2-material/button';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';

@Component({
  selector: 'login',
  templateUrl: '/app/login/login-view.html',
  directives: [
    MdSpinner,
    MD_CARD_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MdButton,
    MD_LIST_DIRECTIVES
  ]
})
export class LoginView {
  server: string;
  projectList: TeamProjectList;
  showTeamProjects: boolean = false;
  showServer: boolean = false;
  showLoading: boolean = true;

  constructor(private window: Window,
              private router: Router,
              private settings: Settings,
              private routeParams: RouteParams,
              private login: Login,
              private user: User,
              private teamProjectListFactory: TeamProjectListFactory) {
    let authToken = this.window.localStorage.getItem("access_token");

    if (authToken != null && authToken != "") {
      this.getProfile();
    }
    else {
      let existingCode = this.window.localStorage.getItem("auth_code");

      if (existingCode === null || existingCode === "") {
        this.resumeWorkflow();
      }
      else {
        this.getAuthToken(existingCode);
      }
    }
  }

  resumeWorkflow() {
    let code = this.routeParams.get('code');

    if (code === null || code === "") {
      this.window.location.href = this.settings.oAuthUrl;
    }
    else {
      this.window.localStorage.setItem("auth_code", code);
      this.getAuthToken(code);
    }
  }

  getAuthToken(existingCode: string) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });

    this.login.getAuthToken(existingCode)
      .subscribe(res => {
        // login.ts sets window.localStorage key's
        this.showServer = true;
        this.showLoading = false;
      }, error => {
        if (error.json().ErrorDescription === "An access token has already been issued") {
          this.window.localStorage.clear();
          this.window.location.href = this.settings.oAuthUrl;
        }
      });
  }

  getProfile() {
    this.user.fetch().subscribe(userObject => {
      this.showServer = true;
      this.showLoading = false;
    }, error => { });
  }

  connectToServer() {
    this.showLoading = true;
    this.showServer = false;
    var appendedServer = "https://" + this.server;
    this.window.localStorage.setItem("server", appendedServer);
    let teamProjectList = this.teamProjectListFactory.create();
    teamProjectList.fetch().subscribe(list => {
      this.projectList = list;
      this.showTeamProjects = true;
      this.showLoading = false;
      this.showServer = false;
    }, error => {
      this.showTeamProjects = false;
      this.showLoading = false;
      this.showServer = true;
    });
  }

  selectTeamProject(project: TeamProject) {
    this.window.localStorage.setItem('project_id', project.id);
    this.router.navigate(['Home']);
  }
}
