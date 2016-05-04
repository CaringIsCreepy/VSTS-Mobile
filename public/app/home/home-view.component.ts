import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {LoginView} from '../login/login-view.component';
import {MdButton} from '@angular2-material/button';
import {MdSpinner} from '@angular2-material/progress-circle';

@Component({
    selector: "home",
    templateUrl: "/app/home/home-view.html",
    directives: [
        MdButton,
        MdSpinner,
        ROUTER_DIRECTIVES
    ]
})
export class HomeView {
    showLoading: boolean = true;
    constructor(private window: Window) {

    }
}