import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {LoginService} from '../service/login-service';
import {OAuthRequest} from './oauth-request';

@Injectable()
export class OAuthHttp {
  private messageQueue: Array<OAuthRequest> = [];
  private isProcessing: boolean;

  constructor(private http: Http,
    private window: Window,
    private loginService: LoginService) {
  }

  get(url: string): Observable<Response> {
    if (this.isProcessing) {
      var request = new OAuthRequest(url, 'get', null);
      this.messageQueue.push(request);
      return request.subject.asObservable();
    }
    else {
      let subject = new Subject<Response>();

      var expirationDate = this.window.localStorage.getItem('expiration_date');

      if (new Date(expirationDate) <= new Date()) {
        this.isProcessing = true;
        this.refreshToken(url, subject, () => {
          this.getAttempt(url, true).subscribe(res2 => {
            this.isProcessing = true;
            subject.next(res2);
            this.clearMessageQueue();
          }, error => {
            this.isProcessing = true;
            subject.error(error);
            this.clearMessageQueue();
          });
        });
      }
      else {
        this.getAttempt(url, true).subscribe(ret => {
          subject.next(ret);
          this.clearMessageQueue();
        }, error => {
          subject.error(error);
          this.clearMessageQueue();
        });
      }

      return subject;
    }
  }

  post(url: string, postData: any): Observable<Response> {
    if (this.isProcessing) {
      var request = new OAuthRequest(url, 'get', null);
      this.messageQueue.push(request);
      return request.subject.asObservable();
    }
    else {
      let subject = new Subject<Response>();

      var expirationDate = this.window.localStorage.getItem('expiration_date');

      if (new Date(expirationDate) <= new Date()) {
        this.refreshToken(url, subject, () => {
          this.postAttempt(url, postData, true).subscribe(res2 => {
            subject.next(res2);
            this.clearMessageQueue();
          }, error => {
            subject.error(error);
            this.clearMessageQueue();
          });
        });
      }
      else {
        this.postAttempt(url, postData, true).subscribe(ret => {
          subject.next(ret);
          this.clearMessageQueue();
        }, error => {
          subject.error(error);
          this.clearMessageQueue();
        });
      }

      return subject;
    }
  }

  private clearMessageQueue() {
    this.messageQueue.forEach(message => {
      switch (message.verb) {
        case 'get':
          this.getAttempt(message.url, false).subscribe(ret => {
            message.subject.next(ret);
          }, error => {
            message.subject.error(error);
          });
          break;
        case 'post':
          this.postAttempt(message.url, message.data, false).subscribe(ret => {
            message.subject.next(ret);
          }, error => {
            message.subject.error(error);
          });
          break;
        default:
          this.getAttempt(message.url, false).subscribe(ret => {
            message.subject.next(ret);
          }, error => {
            message.subject.error(error);
          });
          break;
      }
    });
  }

  private postAttempt(url: string, postData: any, reattempt: boolean): Observable<Response> {
    let headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + this.window.localStorage.getItem("access_token")
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
        'Authorization': "Bearer " + this.window.localStorage.getItem("access_token")
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
    this.loginService.refreshAuthToken().subscribe(res => {
      // login.ts sets window.localStorage key's

      retryCallback()
    }, error => {
      subject.error(error)
    });
  }
}
