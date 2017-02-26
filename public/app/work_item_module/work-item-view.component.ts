import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkItemService } from '../service/work-item-service';
import { WorkItem } from '../business_object/work-item';
import { Settings } from '../core/settings';
import { OAuthHttp } from '../core/oauth-http';

@Component({
    selector: "workItemView",
    templateUrl: "/app/work_item_module/work-item-view.html",
    providers: [WorkItemService, OAuthHttp, Settings, { provide: Window, useValue: window }]
})
export class WorkItemView implements OnInit {
    workItem: WorkItem;
    showLoading: boolean = true;

    constructor(private route: ActivatedRoute,
                private workItemService: WorkItemService) {

    }

    ngOnInit() {
        let id = this.route.snapshot.params['id'];
        
        this.workItemService.getItem(id).subscribe(workItem => {
            this.workItem = workItem;
            this.showLoading = false;
        });
    }
}