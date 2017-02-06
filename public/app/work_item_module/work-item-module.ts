import { NgModule } from '@angular/core';
import { WorkItemHomeView } from './work-item-home-view.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

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
    FormsModule,
    MaterialModule.forRoot()
  ],
  bootstrap: [WorkItemHomeView]
})
export class WorkItemModule { }