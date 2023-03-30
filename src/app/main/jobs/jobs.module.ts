import { NgModule } from '@angular/core';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { JobListComponent } from './job-list/job-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    JobDescriptionComponent,
    JobListComponent
  ],
  imports: [
    JobsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class JobsModule { }
