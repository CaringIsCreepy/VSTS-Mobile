import { Component, Input, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { LoginService } from '../service/login-service';
import { Settings } from '../core/settings';
import { OAuthHttp } from '../core/oauth-http';
import { WorkItemService } from '../service/work-item-service';
import { NavigateTile } from '../tile/navigate-tile.component';
import { IterationService } from '../service/iteration-service';
import { IterationList } from '../business_object/iteration-list';

@Component({
    selector: "workItemHomeView",
    templateUrl: "/app/work_item_module/work-item-home-view.html",
    providers: [WorkItemService, LoginService, IterationService, OAuthHttp, Settings, { provide: Window, useValue: window }]
})
export class WorkItemHomeView implements OnInit {
    @Input() workItemId: string;
    workItemError: string = "";
    searchDisabled: boolean = false;
    workItemView: number;
    iterationList: IterationList;
    showLoading: boolean;

    constructor(private workItemService: WorkItemService,
                private iterationService: IterationService) {
        this.showLoading = true;
        this.iterationService.getList().subscribe(list => {
            this.iterationList = list;
            this.showLoading = false;
        });
    }

    ngOnInit() {
        this.workItemView = 1;
    }

    onKey(event:any) {
        if (event.key === "Enter") {
            this.searchDisabled = true;
            this.workItemService.getItem(+this.workItemId).subscribe(workItem => {
                this.searchDisabled = false;
            }, error => {
                this.searchDisabled = false;
                if (error.status === 404) {
                    this.workItemError = `Work item ${this.workItemId} not found`
                }
            });
        }
        else {
            this.workItemError = "";
        }
    }
}