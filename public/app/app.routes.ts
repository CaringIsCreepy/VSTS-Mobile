import { provideRouter, RouterConfig }  from '@angular/router';
import { LoginView } from './view/login-view.component';
import { HomeView } from './view/home-view.component';
import { BuildView } from './view/build-view.component';
import { WorkItemHomeView } from './view/work-item-home-view.component';
import { SettingsView } from './view/settings-view.component';

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
  },
  {
    path: 'build',
    component: BuildView
  },
  {
    path: 'workItemHome',
    component: WorkItemHomeView
  },
    {
    path: 'settings',
    component: SettingsView
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];