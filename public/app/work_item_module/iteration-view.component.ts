import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IterationService } from '../service/iteration-service';
import { Iteration } from '../business_object/iteration';
import { Settings } from '../core/settings';
import { OAuthHttp } from '../core/oauth-http';

@Component({
    selector: "iterationView",
    templateUrl: "/app/work_item_module/iteration-view.html",
    providers: [IterationService, OAuthHttp, Settings, { provide: Window, useValue: window }]
})
export class IterationView implements OnInit {
    iteration: Iteration = new Iteration();

    constructor(private route: ActivatedRoute,
                private iterationService: IterationService) {

    }

    ngOnInit() {
        let id = this.route.snapshot.params['id'];

        this.iterationService.getById(id).subscribe(iteration => {
            this.iteration = iteration;
        });
    }
}