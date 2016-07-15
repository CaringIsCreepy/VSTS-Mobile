import { provideRouter, RouterConfig }  from '@angular/router';
import { LoginView } from './view/login-view.component';
import { HomeView } from './view/home-view.component';

const routes: RouterConfig = [
  {
    path: 'login',
    component: LoginView
  },
  {
    path: 'loginParam/:code',
    component: LoginView
  },
  {
    path: 'home',
    component: HomeView
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];