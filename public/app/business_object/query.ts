import {Injectable} from '@angular/core';
import {OAuthHttp} from '../core/oauth-http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class Query {
    constructor(private oAuthHttp: OAuthHttp) {
        
    }

    fetch() : Observable<Query> {
        return null;
    }
}