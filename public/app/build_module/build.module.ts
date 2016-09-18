import { NgModule } from '@angular/core';
import { BuildView } from './build-view.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'build',
    component: BuildView
  }
];

@NgModule({
  declarations: [BuildView],
  imports: [
    RouterModule.forRoot(routes),
  ],
  bootstrap: [BuildView]
})
export class BuildModule { }