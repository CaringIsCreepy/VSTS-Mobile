import {bootstrap} from '@angular/platform-browser-dynamic/';
import {App} from './app';
import {HomeView} from './view/home-view.component';
import {HTTP_PROVIDERS} from '@angular/http';
import {provide} from '@angular/core' ;
import {Settings} from './settings';
import {Login} from './business_object/login';
import {User} from './business_object/user';
import {TeamProjectListFactory} from './factory/team-project-list-factory';
import {TeamProjectFactory} from './factory/team-project-factory';
import {TeamProject} from './business_object/team-project';
import {OAuthHttp} from './core/oauth-http';
import {APP_ROUTER_PROVIDERS} from './app.routes';
import {BuildList} from './business_object/build-list';
import {BuildFactory} from './factory/build-factory';
import {QueryList} from './business_object/query-list';
import {WorkItemList} from './business_object/work-item-list';

bootstrap(App, [
  HTTP_PROVIDERS,
  APP_ROUTER_PROVIDERS,
  Settings,
  Login,
  User,
  TeamProjectListFactory,
  TeamProjectFactory,
  OAuthHttp,
  BuildList,
  BuildFactory,
  QueryList,
  WorkItemList,
  provide(Window, {useValue: window})
]);
