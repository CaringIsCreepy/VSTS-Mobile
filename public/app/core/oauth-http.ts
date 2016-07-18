import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Login} from '../business_object/login';

@Injectable()
export class OAuthHttp {
  constructor(private http: Http,
              private window: Window,
              private login: Login) {
  }

  get(url: string): Observable<Response> {
    return this.getAttempt(url, false);
  }

  private getAttempt(url: string, reattempt: boolean): Observable<Response> {
    let headers = new Headers(
    {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization' : "Bearer " + this.window.localStorage.getItem("access_token")
    });

    let options = new RequestOptions({ headers: headers });

    let responseSubject = new Subject<Response>();

    this.http.get(url, options).subscribe(res => {
      responseSubject.next(res);
    }, error => {
      if ((error.status === 0 || error.status === 200) && !reattempt) {
        this.refreshToken(url, responseSubject);
      }
      else {
        responseSubject.error(error);
      }
    });

    return responseSubject.asObservable();
  }

  private refreshToken(url: string, subject: Subject<Response>) {
    this.login.refreshAuthToken().subscribe(res => {
      // login.ts sets window.localStorage key's

      this.getAttempt(url, true).subscribe(res2 => {
        subject.next(res2);
      }, error => {
        subject.error(error);
      });
    }, error => {
      subject.error(error)
    });
  }
}
