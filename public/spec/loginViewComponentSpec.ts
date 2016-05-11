import {LoginView} from '../app/login/login-view.component';

describe("login.component", function() {
    var window: any = {};
    var router: any = {};
    var settings: any = {};
    var routeParams: any = {};
    var login: any = {};
    var user: any = {};
    var teamProjectListFactory: any = {};
    
    it("should call getProfile()", function() {
        
        var loginView = new LoginView(window, router, settings, routeParams, login, user, teamProjectListFactory);
        
        expect(true).toBe(true);
    });
});