import {Injectable} from '@angular/core';
import {OAuthHttp} from '../core/oauth-http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class User {
  constructor(private oAuthHttp: OAuthHttp,
              private window: Window) {
  }

  displayName: string;
  email: string;
  id: string;
  publicAlias: string;

  fetch(): Observable<User> {
    const loginUrl = "https://app.vssps.visualstudio.com/_apis/profile/profiles/me?api-version=1.0";

    let subject = new Subject<User>();

    this.oAuthHttp.get(loginUrl).subscribe(res => {
      let userData = res.json();

      this.displayName = userData.displayName;
      this.email = userData.email;
      this.id = userData.id;
      this.publicAlias = userData.publicAlias;

      subject.next(this);
    }, error => {
      subject.error(error);
    });

    return subject.asObservable();
  }
}
