import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {Settings} from '../settings';
import {Observable} from 'rxjs/Observable';
import {Response} from '@angular/http';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class LoginService {
  constructor(private http: Http,
              private settings: Settings,
              private window: Window) {
  }
  
  isLoggedIn() {
    let teamProject = this.window.localStorage.getItem("project_id");
    
    return teamProject !== null && teamProject !== "" && teamProject !== undefined;
  }

  getAuthToken(existingCode: string): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });

    let subject = new Subject<Response>();

    this.http.post(this.settings.ApplicationUrl + "authToken",
        "assertion=" + existingCode,
        options).subscribe(res => {
          this.window.localStorage.setItem("access_token", res.json().access_token);
          this.window.localStorage.setItem("refresh_token", res.json().refresh_token);
          let expirationDate = new Date();
          expirationDate.setSeconds(expirationDate.getSeconds() + res.json().expires_in);
          this.window.localStorage.setItem("expiration_date", expirationDate.toString());

          subject.next(res);
       }, error => { subject.error(error); });

    return subject.asObservable();
  }

  refreshAuthToken(): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });

    let subject = new Subject<Response>();

    this.http.post(this.settings.ApplicationUrl + "refreshAuthToken",
        "assertion=" + this.window.localStorage.getItem("refresh_token"), options).subscribe(res => {
          let refreshPayload = res.json();

          if (refreshPayload.access_token !== '' && refreshPayload.access_token !== undefined && refreshPayload.access_token !== null) {
            this.window.localStorage.setItem("access_token", res.json().access_token);
            this.window.localStorage.setItem("refresh_token", res.json().refresh_token);
            let expirationDate = new Date();
            expirationDate.setSeconds(expirationDate.getSeconds() + res.json().expires_in);
            this.window.localStorage.setItem("expiration_date", expirationDate.toString());

            subject.next(res);
          }
          else {
            subject.error(res);
          }
       }, error => { subject.error(error); });



    return subject.asObservable();
  }
}
