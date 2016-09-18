import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { App } from './app';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MdProgressCircleModule } from '@angular2-material/progress-circle';
import { MdButtonModule } from '@angular2-material/button';
import { MdInputModule } from '@angular2-material/input';
import { Routes }  from '@angular/router';
import { LoginView } from './view/login-view.component';
import { HomeView } from './view/home-view.component';
import { SettingsView } from './view/settings-view.component';
import { MdRippleModule, MdCoreModule} from '@angular2-material/core';
import { HttpModule } from '@angular/http';
import { BuildTile } from './tile/build-tile.component';
import { QueryTile } from './tile/query-tile.component';
import { BuildModule } from './build_module/build.module';
import { WorkItemModule } from './work_item_module/work-item-module';

const routes: Routes = [
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
    path: 'settings',
    component: SettingsView
  }
];

@NgModule({
  declarations: [App, HomeView, LoginView, SettingsView, BuildTile, QueryTile],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MdCoreModule.forRoot(),
    MdButtonModule.forRoot(),
    MdInputModule.forRoot(),
    MdProgressCircleModule.forRoot(),
    MdRippleModule.forRoot(),
    HttpModule,
    BuildModule,
    WorkItemModule
  ],
  bootstrap: [App]
})
export class AppModule { }