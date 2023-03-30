import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { MatButtonModule } from '@angular/material/button';
import { BlogPopUpComponent } from './blog-popup/pop.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfilePopUpComponent } from './edit-pop/edit-pop.component';


@NgModule({
  declarations: [
    ProfileComponent,
    BlogPopUpComponent,
    ProfilePopUpComponent

  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatButtonModule,
    SharedModule
  ]
})
export class ProfileModule { }
