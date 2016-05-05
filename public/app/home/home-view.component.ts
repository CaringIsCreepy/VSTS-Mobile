import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {LoginView} from '../login/login-view.component';
import {MdButton} from '@angular2-material/button';
import {MdSpinner} from '@angular2-material/progress-circle';
import {Login} from '../business_object/login';

@Component({
    selector: "home",
    templateUrl: "/app/home/home-view.html",
    directives: [
        MdButton,
        MdSpinner,
        ROUTER_DIRECTIVES
    ]
})
export class HomeView {
    showLoading: boolean = true;
    showGetStarted: boolean = false;
    
    constructor(private window: Window,
                private login: Login,
                private router: Router) {
        if (login.isLoggedIn()) {
            this.showGetStarted = false;
        }
        else {
            this.showGetStarted = true;
            this.showLoading = false;
        }
    }
    
    showLogin() {
        this.router.navigate(['Login']);
    }
}