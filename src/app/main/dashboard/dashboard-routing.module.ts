import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { BookingComponent } from './booking/booking.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GalleryComponent } from './gallery/gallery.component';
import { MasterDataComponent } from './master-data/master-data.component';
import { NoticeComponent } from './notice/notice.component';
import { TripPopupComponent } from './trip/trip-popup/trip-popup.component';
import { TripComponent } from './trip/trip.component';
import { BlogComponent } from './blog/blog.component';
import { GuidlineComponent } from './guidline/guidline.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'trip',
    component: TripComponent
  },
  {
    path: 'trip-add',
    component: TripPopupComponent
  },
  {
    path: 'trip-update/:id',
    component: TripPopupComponent
  },
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent
  },
  {
    path: 'master-data',
    component: MasterDataComponent
  },
  {
    path: 'notice',
    component: NoticeComponent
  },
  {
    path: 'booking',
    component: BookingComponent
  },
  {
    path: 'enquiry',
    component: EnquiryComponent
  },
  {
    path: 'blog',
    component: BlogComponent
  },
  {
    path: 'guidline',
    component: GuidlineComponent
  },
  {
    path: 'subscription',
    component: SubscriptionComponent
  },
  {
    path: 'our-team',
    component: TeamComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
