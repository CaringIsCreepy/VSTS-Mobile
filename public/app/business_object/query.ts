import {Injectable} from '@angular/core';
import {OAuthHttp} from '../core/oauth-http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class Query {
    name: string;
    id: string;
    path: string;
    isFolder: boolean;
    hasChildren: boolean;
    children: Array<Query>;
    isPublic: boolean;

    constructor(private oAuthHttp: OAuthHttp) { }

    fetch() : Observable<Query> {
        return null;
    }

    populate(queryJson: any) {
        this.name = queryJson.name;
        this.id = queryJson.id;
        this.path = queryJson.path;
        this.isFolder = queryJson.isFolder;
        this.hasChildren = queryJson.hasChildren;
        this.isPublic = queryJson.isPublic;
        if (this.hasChildren && queryJson.children !== undefined) {
            queryJson.children.forEach(query => {
                var childQuery = new Query(this.oAuthHttp);
                childQuery.populate(query);
                this.children.push(childQuery);
            });
        }
    }
}