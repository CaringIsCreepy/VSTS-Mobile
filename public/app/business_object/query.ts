import {OAuthHttp} from '../core/oauth-http';
import {Observable} from 'rxjs/Observable';

export class Query {
    constructor(private oAuthHttp: OAuthHttp) {
    }

    fetch() : Observable<Query> {


        return null;
    }
}