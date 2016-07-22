import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {URLSearchParams} from '@angular/http';
import {LoginView} from './view/login-view.component';
import {HomeView} from './view/home-view.component';
import {Login} from './business_object/login';
import {Settings} from './settings';

@Component({
    selector: "my-app",
    templateUrl: "/app/app-view.html",
    directives: [
        ROUTER_DIRECTIVES,
        HomeView,
    ],
    precompile: [HomeView, LoginView]
})

export class App {
    private isLoggedIn: boolean;

    constructor(private login: Login,
                private router: Router,
                private settings: Settings) {
        this.isLoggedIn = login.isLoggedIn()
        
        if (this.isLoggedIn) {    
            this.router.navigate(['home']);
        }
        else {
            let params = new URLSearchParams(window.location.href);
            let code = params.get(this.settings.ApplicationUrl + "?code");
            
            if (code !== null && code !== "" && code !== undefined) {
                //this.router.navigate(['loginParam', { code: code }]);
                this.router.navigate(['/loginParam', code]);
            }
            else {
                this.router.navigate(['home']);
            }
        }
    }
}