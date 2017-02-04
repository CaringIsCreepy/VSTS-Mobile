import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {LoginView} from '../view/login-view.component';
import {LoginService} from '../service/login-service';
import {MdSpinner} from '@angular2-material/progress-circle';
import {MdButton} from '@angular2-material/button';
import {User} from '../business_object/user';
import {DashboardList} from '../business_object/dashboard-list';
import {DashboardService} from '../service/dashboard-service';
import {UserService} from '../service/user-service';

@Component({
    selector: "home",
    templateUrl: "/app/view/home-view.html",
    providers: [UserService, DashboardService]
})
export class HomeView {
    showLoading: boolean = true;
    showGetStarted: boolean = false;
    dashboardList: DashboardList;
    
    constructor(private window: Window,
                private loginService: LoginService,
                private router: Router,
                private route: ActivatedRoute,
                private dashboardService: DashboardService,
                private userService: UserService) {
        if (loginService.isLoggedIn()) {
            this.showGetStarted = false;

            this.dashboardService.getList().subscribe(list => {
                this.dashboardList = list;
            });
        }
        else {
            this.showGetStarted = true;
            this.showLoading = false;
        }
    }
    
    showLogin() {
        this.router.navigate(['login']);
    }
}