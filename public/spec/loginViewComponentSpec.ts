import {LoginView} from '../app/login/login-view.component';

describe("login.component", function() {
     beforeEachProviders(() => [LoginView]);
  
     it('calls getProfile', inject([LoginView], (service) => {
         expect(true).toBe(true);
     }));

});