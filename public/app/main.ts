// import {bootstrap} from '@angular/platform-browser-dynamic/';
// import {App} from './app';
// import {HTTP_PROVIDERS} from '@angular/http';
// import {provide} from '@angular/core' ;
// import {Settings} from './core/settings';
// import {OAuthHttp} from './core/oauth-http';
// import {APP_ROUTER_PROVIDERS} from './app.routes';
// import {LoginService} from './service/login-service';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule }              from './app.module';

platformBrowserDynamic().bootstrapModule(AppModule);

// bootstrap(App, [
//   HTTP_PROVIDERS,
//   APP_ROUTER_PROVIDERS,
//   Settings,
//   OAuthHttp,
//   LoginService,
//   provide(Window, {useValue: window})
// ]);