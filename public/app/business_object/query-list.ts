import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Query } from './query';
import { OAuthHttp } from '../core/oauth-http';

@Injectable()
export class QueryList extends Array<Query> {
    constructor() {
        super();
    }

}