import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../service/login-service';
import {Settings} from '../core/settings';
import {OAuthHttp} from '../core/oauth-http';

@Component({
    selector: "workItemHomeView",
    templateUrl: "/app/work_item_module/work-item-home-view.html",
    providers: [
        LoginService,
        OAuthHttp,
        Settings,
        { provide: Window, useValue: window }
    ]
})
export class WorkItemHomeView {
    
}