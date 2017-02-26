import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { WorkItemHomeView } from './work-item-home-view.component';
import { IterationView } from './iteration-view.component';
import { WorkItemView } from './work-item-view.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { NavigateTile } from '../tile/navigate-tile.component';

const routes: Routes = [
  {
    path: 'workItemHome',
    component: WorkItemHomeView
  },
  {
    path: 'iteration/:id',
    component: IterationView
  },
  {
    path: 'workItem/:id',
    component: WorkItemView
  }
];

@NgModule({
  declarations: [WorkItemHomeView, IterationView, NavigateTile, WorkItemView],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MaterialModule.forRoot()
  ],
  bootstrap: [WorkItemHomeView]
})
export class WorkItemModule {}