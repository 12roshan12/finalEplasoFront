import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TripComponent } from './trip/trip.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { CategoryComponent } from './category/category.component';
import { MessageComponent } from './message/message.component';
import { NoticeComponent } from './notice/notice.component';
import { TripPopupComponent } from './trip/trip-popup/trip-popup.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryPopupComponent } from './category/category-popup/category-popup.component';
import { BookingComponent } from './booking/booking.component';
import { BookingPopupComponent } from './booking/booking-popup/booking-popup.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { EnquiryPopupComponent } from './enquiry/enquiry-popup/enquiry-popup.component';
import { GuidlineComponent } from './guidline/guidline.component';
import { BlogComponent } from './blog/blog.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { UserComponent } from './user/user.component';
import { BlogAdminPopUpComponent } from './blog/blog-popup/pop.component';
import { GuidlinePopupComponent } from './guidline/guidline-popup/guidline-popup.component';
import { NoticePopupComponent } from './notice/notice-popup/notice-popup.component';



@NgModule({
  declarations: [
    DashboardComponent,
    TripComponent,
    GalleryComponent,
    MasterDataComponent,
    CategoryComponent,
    MessageComponent,
    NoticeComponent,
    TripPopupComponent,
    CategoryPopupComponent,
    BookingComponent,
    BookingPopupComponent,
    EnquiryPopupComponent,
    GuidlineComponent,
    BlogComponent,
    SubscriptionComponent,
    UserComponent,
    BlogAdminPopUpComponent,
    GuidlinePopupComponent,
    NoticePopupComponent
  ],
  imports: [
    SharedModule,
    DashboardRoutingModule,

  ]
})
export class DashboardModule { }
