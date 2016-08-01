import {Subject} from 'rxjs/Subject';
import {Response} from '@angular/http';

export class OAuthRequest {
    constructor(url: string, verb: string, data: any) {
        this.url = url;
        this.verb = verb;
        this.data = data;
        this.subject = new Subject<Response>();
    }
    url: string;
    data: any;
    verb: string;
    subject: Subject<Response>;
}