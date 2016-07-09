import {LoginView} from '../app/login/login-view.component';

describe("login.component", function () {
    beforeEachProviders(() => [LoginView]);

    beforeEach(inject([LoginView], _tcb => {
       var tcb = _tcb
    }));

    it('calls getProfile', done => {
        
    });
});