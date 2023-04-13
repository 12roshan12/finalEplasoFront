import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main.component';
import { MainRoutingModule } from './main.routing';
import { EnquiryComponent } from './dashboard/enquiry/enquiry.component';
import { BlogComponent } from './blog/blog.component';
import { BlogPreviewComponent } from './blog-preview/blog-preview.component';
import { LandingPageComponent } from './landing/landing-page/landing-page.component';
import { NoticePopComponent } from './landing/landing-page/notice-pop/notice-pop.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TravelGuideComponent } from './travel-guide/travel-guide.component';

@NgModule({
  declarations: [
    MainComponent,
    EnquiryComponent,
    BlogComponent,
    BlogPreviewComponent ,
    LandingPageComponent,
    NoticePopComponent,
    ContactUsComponent,
    TravelGuideComponent,

  ],
  imports: [
    SharedModule,
    MainRoutingModule
  ]
})
export class MainModule { }
