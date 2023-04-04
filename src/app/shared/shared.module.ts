import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { RouterModule } from '@angular/router';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import { LoaderComponent } from './loader/loader.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './footer/footer.component';
import { BreadCrumbComponent } from './bread-crumb/breadCrumb.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { QuillModule } from 'ngx-quill'
import {MatRadioModule} from '@angular/material/radio';
import {MatChipsModule} from '@angular/material/chips';
import {ToastrModule} from 'ngx-toastr'
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    SidebarComponent,
    TopbarComponent,
    TopNavBarComponent,
    LoaderComponent,
    FooterComponent,
    BreadCrumbComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    QuillModule.forRoot(),
    ToastrModule.forRoot(),
    MatMenuModule,
    ReactiveFormsModule,
    FormsModule,

  ],
  exports: [
    CommonModule,
    SidebarComponent,
    TopbarComponent,
    TopNavBarComponent,
    LoaderComponent,
    MatTooltipModule,
    MatButtonModule,
    BreadCrumbComponent,
    FooterComponent,
    MatMenuModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatSelectModule,
    QuillModule,
    MatRadioModule,
    MatChipsModule,
    ToastrModule,
    NgSelectModule,
  ]
})
export class SharedModule { }
