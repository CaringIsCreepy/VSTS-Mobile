import {Component} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';
import {URLSearchParams} from '@angular/http';
import {LoginView} from './view/login-view.component';
import {HomeView} from './view/home-view.component';
import {LoginService} from './service/login-service';
import {Settings} from './settings';
import {WorkItemHomeView} from  './view/work-item-home-view.component';
import {BuildView} from './view/build-view.component';
import {SettingsView} from './view/settings-view.component';

@Component({
    selector: "my-app",
    templateUrl: "/app/app-view.html",
    directives: [
        ROUTER_DIRECTIVES,
        HomeView,
    ],
    precompile: [HomeView, LoginView, WorkItemHomeView, BuildView, SettingsView]
})

export class App {
    private isLoggedIn: boolean;

    constructor(private loginService: LoginService,
                private router: Router,
                private settings: Settings) {
        this.isLoggedIn = loginService.isLoggedIn()
        
        if (this.isLoggedIn) {    
            this.router.navigate(['home']);
        }
        else {
            let params = new URLSearchParams(window.location.href);
            let code = params.get(this.settings.ApplicationUrl + "?code");
            
            if (code !== null && code !== "" && code !== undefined) {
                this.router.navigate(['/loginParam', code]);
            }
            else {
                this.router.navigate(['home']);
            }
        }
    }
}