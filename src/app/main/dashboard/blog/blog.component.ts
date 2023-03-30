import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ProfileService } from '../../profile/profile.service';
import { AdminService } from '../dashboard.service';
import { BlogAdminPopUpComponent } from './blog-popup/pop.component';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  imageEnvironmentUrl = environment.Main_Api + 'media/file/'
  blogList:any [] =[]
  userDetails:any

  constructor(private dialog: MatDialog, private service: AdminService, private toastr: ToastrService, private profileService: ProfileService) { }

  ngOnInit(): void {

    this.profileService.getUserDetails(sessionStorage.getItem('userId')).subscribe({
      next: (res: any) => {
        this.userDetails = res.data
      },
      error: (err: any) => {
      }
    })

    this.service.GetAllblog().subscribe({
      next: (res: any) => {
        this.blogList = res.data
        console.log(this.blogList);
      },
      error: (err: any) => {
        this.toastr.error(err.error.message)
      }
    })
  }

  openBlogPopup(data?: any) {

    if(this.userDetails.profession == '' && this.userDetails.image == '')
    {
      this.toastr.error("Please Complete profile to post blog")
      return
    }

    
    let dialog = this.dialog.open(BlogAdminPopUpComponent, {
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
