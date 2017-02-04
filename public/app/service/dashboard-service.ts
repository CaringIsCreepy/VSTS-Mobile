import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {OAuthHttp} from '../core/oauth-http';
import {BuildDefinition} from '../business_object/build-definition';
import {DashboardList} from '../business_object/dashboard-list';
import {Dashboard} from '../business_object/dashboard';

@Injectable()
export class DashboardService {
    constructor(private window: Window,
                private oAuthHttp: OAuthHttp) {
    }

    getList() : Observable<DashboardList> {
        let subject = new Subject<DashboardList>();
        let returnValue = new DashboardList();
        let server = this.window.localStorage.getItem('server');
        let teamProjectId = this.window.localStorage.getItem('project_id');
        let url = server + '/DefaultCollection/' + teamProjectId + '/_apis/Dashboard/Dashboards/?api-version=3.0-preview.2';

        this.oAuthHttp.get(url).subscribe(res => {
            let dashboardList = res.json();

            for (var i = 0; i < dashboardList.value.length; i++) {
                let dashboard = new Dashboard();
                dashboard.populate(dashboardList.dashboardEntries[i])

                returnValue.push(dashboard);
            }
            
            subject.next(returnValue);
        });

        return subject.asObservable();
    }
}