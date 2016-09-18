import { NgModule } from '@angular/core';
import { WorkItemHomeView } from './work-item-home-view.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'workItemHome',
    component: WorkItemHomeView
  }
];

@NgModule({
  declarations: [WorkItemHomeView],
  imports: [
    RouterModule.forRoot(routes),
  ],
  bootstrap: [WorkItemHomeView]
})
export class WorkItemModule { }