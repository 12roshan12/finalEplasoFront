import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AdminService } from '../../dashboard/dashboard.service';
import { BlogPopUpComponent } from '../blog-popup/pop.component';
import { ProfilePopUpComponent } from '../edit-pop/edit-pop.component';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  blogList: any[] = []
  bookingList: any[] = []
  enquiryList: any[] = []
  userDetails: any
  imageEnvironmentUrl = environment.Main_Api + 'media/file/'

  constructor(private dialog: MatDialog, private service: AdminService, private toastr: ToastrService, private profileService: ProfileService) { }

  ngOnInit(): void {

    this.profileService.getUserDetails(sessionStorage.getItem('userId')).subscribe({
      next: (res: any) => {
        this.userDetails = res.data
      },
      error: (err: any) => {
      }
    })

    this.profileService.GetAllblogByUser(sessionStorage.getItem('user')).subscribe({
      next: (res: any) => {
        this.blogList = res.data
        console.log(this.blogList);
      },
      error: (err: any) => {
        this.toastr.error(err.error.message)
      }
    })
  }

  openProfile() {
    let dialog = this.dialog.open(ProfilePopUpComponent, {
      minWidth: '90vw',
      disableClose: true,
      data: this.userDetails ? this.userDetails : null
    })

    dialog.afterClosed().subscribe((result: any) => {
      if (result != '') {
        window.location.reload()
      }
    })
  }

  openBlogPopup(data?: any) {

    if(this.userDetails.profession == '' && this.userDetails.image == '')
    {
      this.toastr.error("Please Complete profile to post blog")
      return
    }

    
    let dialog = this.dialog.open(BlogPopUpComponent, {
      minWidth: '90vw',
      minHeight: '90vh',
      disableClose: true,
      data: data ? data : null
    })

    dialog.afterClosed().subscribe((result: any) => {
      if (result != '') {
        window.location.reload();
      }
    })
  }

  deleteBog(data: any) {
    this.profileService.deleteblog(data).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message)
        this.ngOnInit()
      },
      error: (err: any) => {
        this.toastr.error(err.error.message)
      }
    })
  }

}
