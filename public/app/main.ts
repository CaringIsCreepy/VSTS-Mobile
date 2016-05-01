import {bootstrap} from 'angular2/platform/browser';
import {App} from './app';
import {HomeView} from './home/home-view.component';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS}from 'angular2/router';
import {provide} from 'angular2/core' ;
import {Settings} from './settings';
import {Login} from './business_object/login';
import {User} from './business_object/user';
import {TeamProjectListFactory} from './factory/team-project-list-factory';
import {TeamProjectFactory} from './factory/team-project-factory';
import {TeamProject} from './business_object/team-project';
import {OAuthHttp} from './core/oauth-http';

bootstrap(App, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  Settings,
  Login,
  User,
  TeamProjectListFactory,
  TeamProjectFactory,
  OAuthHttp,
  provide(Window, {useValue: window})
]);
