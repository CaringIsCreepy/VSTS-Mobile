import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {OAuthHttp} from '../core/oauth-http';
import {User} from '../business_object/user';

@Injectable()
export class UserService {
    constructor(private window: Window,
        private oAuthHttp: OAuthHttp) { }

    getCurrentUser(): Observable<User> {
        const loginUrl = "https://app.vssps.visualstudio.com/_apis/profile/profiles/me?api-version=1.0";

        let subject = new Subject<User>();

        this.oAuthHttp.get(loginUrl).subscribe(res => {
            let userData = res.json();
            let returnValue = new User();

            returnValue.displayName = userData.displayName;
            returnValue.email = userData.email;
            returnValue.id = userData.id;
            returnValue.publicAlias = userData.publicAlias;

            subject.next(returnValue);
        }, error => {
            subject.error(error);
        });

        return subject.asObservable();
    }
}