import { NgModule } from '@angular/core';
import { LandingRoutingModule } from './landing-routing.module';
import { FindJobsComponent } from './find-jobs/find-jobs.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    FindJobsComponent,
  ],
  imports: [
    SharedModule,
    CommonModule
  ]
})
export class LandingModule { }
