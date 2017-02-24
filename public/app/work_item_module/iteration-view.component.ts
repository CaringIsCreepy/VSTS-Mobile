import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IterationService } from '../service/iteration-service';
import { WorkItemService } from '../service/work-item-service';
import { Iteration } from '../business_object/iteration';
import { WorkItemList } from '../business_object/work-item-list';
import { Settings } from '../core/settings';
import { OAuthHttp } from '../core/oauth-http';

@Component({
    selector: "iterationView",
    templateUrl: "/app/work_item_module/iteration-view.html",
    providers: [IterationService, WorkItemService, OAuthHttp, Settings, { provide: Window, useValue: window }]
})
export class IterationView implements OnInit {
    iteration: Iteration = new Iteration();
    workItemList: WorkItemList;

    constructor(private route: ActivatedRoute,
                private iterationService: IterationService,
                private workItemService: WorkItemService) {

    }

    ngOnInit() {
        let id = this.route.snapshot.params['id'];

        this.iterationService.getById(id).subscribe(iteration => {
            this.iteration = iteration;

            let wiql = `Select [State], [Title] From WorkItems Where [System.IterationPath] = '${this.iteration.path}'`;

            this.workItemService.getListFromWIQL(wiql).subscribe(workItemList => {
                this.workItemList = workItemList;
            });
        });
    }
}