import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdProgressCircleModule } from '@angular2-material/progress-circle';
import { MdButtonModule } from '@angular2-material/button';
import { MdInputModule } from '@angular2-material/input';
import { provideRouter, RouterConfig }  from '@angular/router';
import { LoginView } from './view/login-view.component';
import { HomeView } from './view/home-view.component';
import { BuildView } from './view/build-view.component';
import { WorkItemHomeView } from './view/work-item-home-view.component';
import { SettingsView } from './view/settings-view.component';
import { MdRippleModule } from '@angular2-material/core';
import { HttpModule } from '@angular/http';

const routes: RouterConfig = [
  {
    path: '',
    component: App
  },
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

@NgModule({
  declarations: [App, HomeView, LoginView, BuildView, WorkItemHomeView, SettingsView],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MdButtonModule,
    MdInputModule,
    MdProgressCircleModule,
    MdRippleModule,
    HttpModule
  ],
  bootstrap: [App]
})
export class AppModule { }