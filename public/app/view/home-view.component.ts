import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {LoginView} from '../view/login-view.component';
import {Login} from '../business_object/login';
import {MdSpinner} from '@angular2-material/progress-circle';
import {MdButton} from '@angular2-material/button';
import {User} from '../business_object/user';
import {BuildList} from '../business_object/build-list';
import {Build} from '../business_object/build';
import {BuildTile} from '../tile/build-tile.component';

@Component({
    selector: "home",
    templateUrl: "/app/view/home-view.html",
    directives: [
        ROUTER_DIRECTIVES,
        MdSpinner,
        MdButton,
        BuildTile
    ]
})
export class HomeView {
    showLoading: boolean = true;
    showGetStarted: boolean = false;
    loggedInUser: User;
    topBuildList: BuildList;
    topBuild: Build;
    
    constructor(private window: Window,
                private login: Login,
                private router: Router,
                private buildList : BuildList,
                private user: User) {
        if (login.isLoggedIn()) {
            this.showGetStarted = false;
            this.buildList.fetch().subscribe(buildList => {
                this.topBuildList = buildList;
                this.topBuild = this.topBuildList[0];
                this.showLoading = false;
            });
        }
        else {
            this.showGetStarted = true;
            this.showLoading = false;
        }
    }
    
    showLogin() {
        this.router.navigate(['login']);
    }
}