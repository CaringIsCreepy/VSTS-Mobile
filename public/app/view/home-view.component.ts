import {Component} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {LoginView} from '../view/login-view.component';
import {LoginService} from '../service/login-service';
import {BuildList} from '../business_object/build-list';
import {Build} from '../business_object/build';
import {BuildTile} from '../tile/build-tile.component';
import {QueryList} from '../business_object/query-list';
import {Query} from '../business_object/query';
import {QueryTile} from '../tile/query-tile.component';
import {BuildService} from '../service/build-service';
import {QueryService} from '../service/query-service';
import {WorkItemService} from '../service/work-item-service';
import {MdSpinner} from '@angular2-material/progress-circle';
import {MdButton} from '@angular2-material/button';
import {User} from '../business_object/user';
import {DashboardList} from '../business_object/dashboard-list';
import {DashboardService} from '../service/dashboard-service';
import {UserService} from '../service/user-service';

@Component({
    selector: "home",
    templateUrl: "/app/view/home-view.html",
    providers: [UserService, DashboardService, BuildService, QueryService, WorkItemService]
})
export class HomeView {
    showLoading: boolean = true;
    showGetStarted: boolean = false;
    dashboardList: DashboardList;
    topBuildList: BuildList;
    topBuild: Build;
    topQuery: Query;
    
    constructor(private window: Window,
                private loginService: LoginService,
                private router: Router,
                private route: ActivatedRoute,
                private dashboardService: DashboardService,
                private buildService : BuildService,
                private queryService : QueryService,
                private userService: UserService) {
        if (loginService.isLoggedIn()) {
            this.showGetStarted = false;

            var pins = this.window.localStorage.getItem('pinnedItems');

            if (pins !== '' && pins !== null) {
                this.dashboardService.getList().subscribe(list => {
                    this.dashboardList = list;
                });
            }
            else {
                this.loadBoilerPlateScreen();
            }
        }
        else {
            this.showGetStarted = true;
            this.showLoading = false;
        }
    }
    
    showLogin() {
        this.router.navigate(['login']);
    }

    loadBoilerPlateScreen() {
        this.buildService.getList().subscribe(buildList => {
            this.topBuildList = buildList;
            this.topBuild = this.topBuildList[0];
            this.showLoading = false;
        });

        this.queryService.getListAsFlat().subscribe(queryList => {
            if (queryList.length > 0) {
                queryList.forEach(query => {
                    if (query.name === 'My Tasks' || query.name === 'My Work Items' || query.name === 'Assigned to me') {
                        this.topQuery = query;
                    }
                });

                if (this.topQuery === undefined) {
                    this.topQuery = queryList[0];
                }
            }
        });
    }
}