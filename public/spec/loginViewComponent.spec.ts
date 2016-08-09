import {LoginView} from '../app/view/login-view.component';
import {describe, beforeEachProviders, beforeEach, it, inject, expect} from '@angular/core/testing';

describe("login.component", () => {
    // beforeEachProviders(() => [LoginView]);

    // beforeEach(inject([LoginView], _tcb => {
    //    var tcb = _tcb
    // }));

    it('calls getProfile', () => {
        expect(1).toEqual(1);
    });

    it('should call userService.get()', inject([LoginView], (loginView: LoginView) => {

    }));
});