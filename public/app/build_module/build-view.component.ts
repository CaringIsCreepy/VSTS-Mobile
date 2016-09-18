import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../service/login-service';
import {Settings} from '../core/settings';
import {OAuthHttp} from '../core/oauth-http';

@Component({
    selector: "build",
    templateUrl: "/app/build_module/build-view.html",
    providers: [
        LoginService,
        OAuthHttp,
        Settings,
        { provide: Window, useValue: window }
    ]
})
export class BuildView {
    
}