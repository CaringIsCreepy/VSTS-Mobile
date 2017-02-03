import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../service/login-service';
import {Settings} from '../core/settings';
import {OAuthHttp} from '../core/oauth-http';
import {WorkItemService} from '../service/work-item-service';

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
    @Input() workItemId: string;

    constructor(private workItemService: WorkItemService) {

    }

    onKey(event:any) {
        if (event.key === "Enter") {
            this.workItemService.getItem(<number>new Number(this.workItemId))
        }
    }
}