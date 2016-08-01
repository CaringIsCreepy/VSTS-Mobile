import { Component } from '@angular/core';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input/input';
import {FORM_DIRECTIVES} from '@angular/forms';

@Component({
    selector: "workItemHomeView",
    templateUrl: "/app/view/work-item-home-view.html",
    directives: [MD_INPUT_DIRECTIVES, FORM_DIRECTIVES]
})
export class WorkItemHomeView {
    
}