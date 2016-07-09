import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {LoginView} from '../login/login-view.component';
import {Login} from '../business_object/login';
import {MdSpinner} from '@angular2-material/progress-circle';
import {MdButton} from '@angular2-material/button';

@Component({
    selector: "home",
    templateUrl: "/app/home/home-view.html",
    directives: [
        ROUTER_DIRECTIVES,
        MdSpinner,
        MdButton
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
        this.router.navigate(['login']);
    }
}