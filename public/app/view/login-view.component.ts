import {Component, Input, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Settings} from '../core/settings';
import {LoginService} from '../service/login-service';
import {UserService} from '../service/user-service';
import {TeamProject} from '../business_object/team-project';
import {TeamProjectList} from '../business_object/team-project-list';
import {TeamProjectService} from '../service/team-project-service';

@Component({
  selector: 'login',
  templateUrl: '/app/view/login-view.html',
  providers: [UserService, TeamProjectService]
})
export class LoginView implements OnInit {
  projectList: TeamProjectList;
  showTeamProjects: boolean = false;
  showServer: boolean = false;
  showLoading: boolean = true;
  code: string;
  @Input() server: string;

  constructor(private window: Window,
    private router: Router,
    private settings: Settings,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private userService: UserService,
    private teamProjectService: TeamProjectService) {
  }

  ngOnInit() {
    this.code = this.route.snapshot.params['code'];

    let authToken = this.window.localStorage.getItem("access_token");

    if (authToken !== null && authToken !== "" && authToken !== undefined) {
      this.getProfile();
    }
    else {
      let existingCode = this.window.localStorage.getItem("auth_code");

      if (existingCode === null || existingCode === "" || existingCode === undefined) {
        this.resumeWorkflow();
      }
      else {
        this.getAuthToken(existingCode);
      }
    }
  }

  resumeWorkflow() {
    if (this.code === null || this.code === "" || this.code === undefined) {
      this.window.location.href = this.settings.oAuthUrl;
    }
    else {
      this.window.localStorage.setItem("auth_code", this.code);
      this.getAuthToken(this.code);
    }
  }

  getAuthToken(existingCode: string) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });

    this.loginService.getAuthToken(existingCode)
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
    this.userService.getCurrentUser().subscribe(userObject => {
      this.showServer = true;
      this.showLoading = false;
    }, error => { });
  }

  connectToServer() {
    this.showLoading = true;
    this.showServer = false;
    var appendedServer = "https://" + this.server;
    this.window.localStorage.setItem("server", appendedServer);
    let teamProjectList = new TeamProjectList();
    this.teamProjectService.getList().subscribe(list => {
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
    this.window.localStorage.setItem('project_name', project.name);
    this.router.navigate(['home']);
  }
}
