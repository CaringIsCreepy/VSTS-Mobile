import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {URLSearchParams} from '@angular/http';
import {LoginView} from './view/login-view.component';
import {HomeView} from './view/home-view.component';
import {LoginService} from './service/login-service';
import {Settings} from './core/settings';
import {OAuthHttp} from './core/oauth-http';

@Component({
    selector: "my-app",
    templateUrl: "/app/app-view.html",
    providers: [
        LoginService,
        OAuthHttp,
        Settings,
        { provide: Window, useValue: window }
    ]
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
            let code = params.get(this.settings.RedirectBaseUrl + "?code");

            if (code !== null && code !== "" && code !== undefined) {
                this.router.navigate(['/loginParam', code]);
            }
            else {
                this.router.navigate(['home']);
            }
        }
    }
}