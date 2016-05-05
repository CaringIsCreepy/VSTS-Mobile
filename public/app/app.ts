import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {URLSearchParams} from 'angular2/http';
import {LoginView} from './login/login-view.component';
import {HomeView} from './home/home-view.component';
import {Login} from './business_object/login';
import {MdButton} from '@angular2-material/button';
import {Settings} from './settings';

@Component({
    selector: "my-app",
    templateUrl: "/app/app-view.html",
    directives: [
        ROUTER_DIRECTIVES,
        HomeView,
        MdButton
    ]
})
@RouteConfig([
    {path:'/login', name: 'Login', component: LoginView},
    {path:'/login/:code', name: 'LoginParam', component: LoginView},
    {path:'/home', name: 'Home', component: HomeView},
])
export class App {
    constructor(private login: Login,
                private router: Router,
                private settings: Settings) {
        if (login.isLoggedIn()) {    
            this.router.navigate(['Home']);
        }
        else {
            let params = new URLSearchParams(window.location.href);
            let code = params.get(this.settings.ApplicationUrl + "?code");
            
            if (code !== null && code !== "") {
                this.router.navigate(['LoginParam', { code: code }]);
            }
            else {
                this.router.navigate(['Home']);
            }
        }
    }
}