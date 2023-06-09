import { NgModule } from '@angular/core';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobDescriptionComponent } from './job-description/job-description.component';
import { JobListComponent } from './job-list/job-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReviewComponent } from './review/review.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
@NgModule({
  declarations: [
    JobDescriptionComponent,
    JobListComponent,
    ReviewComponent
  ],
  imports: [
    JobsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    SlickCarouselModule
  ]
})
export class JobsModule { }
