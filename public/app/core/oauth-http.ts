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

  post(url: string, postData: any): Observable<Response> {
    return this.postAttempt(url, postData, false);
  }

  private postAttempt(url: string, postData: any, reattempt: boolean): Observable<Response> {
    let headers = new Headers(
    {
      'Content-Type': 'application/json',
      'Authorization' : "Bearer " + this.window.localStorage.getItem("access_token")
    });

    let options = new RequestOptions({ headers: headers });

    let responseSubject = new Subject<Response>();

    this.http.post(url, postData, options).subscribe(res => {
      responseSubject.next(res);
    }, error => {
      if ((error.status === 0 || error.status === 200) && !reattempt) {
        this.refreshToken(url, responseSubject, () => {
            this.postAttempt(url, postData, true).subscribe(res2 => {
              responseSubject.next(res2);
            }, error => {
              responseSubject.error(error);
            });
        });
      }
      else {
        responseSubject.error(error);
      }
    });

    return responseSubject.asObservable();
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
        this.refreshToken(url, responseSubject, () => {
            this.getAttempt(url, true).subscribe(res2 => {
              responseSubject.next(res2);
            }, error => {
              responseSubject.error(error);
            });
        });
      }
      else {
        responseSubject.error(error);
      }
    });

    return responseSubject.asObservable();
  }

  private refreshToken(url: string, subject: Subject<Response>, retryCallback: () => void) {
    this.login.refreshAuthToken().subscribe(res => {
      // login.ts sets window.localStorage key's

      retryCallback()
    }, error => {
      subject.error(error)
    });
  }
}
