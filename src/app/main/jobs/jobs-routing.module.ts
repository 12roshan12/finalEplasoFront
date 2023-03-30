import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { JobListComponent } from './job-list/job-list.component';

const routes: Routes = [
  {
    path: '',
    component: JobListComponent
  },
  {
    path: 'package-details/:id',
    component: JobDescriptionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
