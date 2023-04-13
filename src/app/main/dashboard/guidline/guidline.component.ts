import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../dashboard.service';
import { GuidlinePopupComponent } from './guidline-popup/guidline-popup.component';
import { BlogAdminPopUpComponent } from '../blog/blog-popup/pop.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ProfileService } from '../../profile/profile.service';

@Component({
  selector: 'app-guidline',
  templateUrl: './guidline.component.html',
  styleUrls: ['./guidline.component.scss']
})
export class GuidlineComponent {

  imageEnvironmentUrl = environment.Main_Api + 'media/file/'
  blogList: any[] = []
  userDetails: any

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
        this.blogList = this.blogList.filter((data: any) => {
          if (data.isGuidline == true) return data
        })
      },
      error: (err: any) => {
        this.toastr.error(err.error.message)
      }
    })
  }

  openBlogPopup(data?: any) {

    if (this.userDetails.profession == '' && this.userDetails.image == '') {
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

    Swal.fire({
      title: 'Do you want to delete the blog?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.profileService.deleteblog(data).subscribe({
          next: (res: any) => {
            this.toastr.success(res.message)
            this.ngOnInit()
          },
          error: (err: any) => {
            this.toastr.error(err.error.message)
          }
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })



  }


}
