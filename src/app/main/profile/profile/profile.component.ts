import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AdminService } from '../../dashboard/dashboard.service';
import { BlogPopUpComponent } from '../blog-popup/pop.component';
import { ProfilePopUpComponent } from '../edit-pop/edit-pop.component';
import { ProfileService } from '../profile.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  constructor(private dialog: MatDialog, private service: AdminService,private router:Router, private toastr: ToastrService, private profileService: ProfileService) { }

  ngOnInit(): void {

    if(sessionStorage.getItem('token') == undefined )
    {
      this.router.navigateByUrl('/')
    }

    this.profileService.getUserDetails(sessionStorage.getItem('userId')).subscribe({
      next: (res: any) => {
        this.userDetails = res.data
      },
      error: (err: any) => {
      }
    })

    this.profileService.GetAllblogByUser(sessionStorage.getItem('userId')).subscribe({
      next: (res: any) => {
        this.blogList = res.data
        console.log(this.blogList);
      },
      error: (err: any) => {
        this.toastr.error(err.error.message)
      }
    })

    this.profileService.GetAllenquiryByUser(sessionStorage.getItem('userId')).subscribe({
      next: (res: any) => {
        this.enquiryList = res.data
        console.log(this.enquiryList);
      },
      error: (err: any) => {
        this.toastr.error(err.error.message)
      }
    })

    this.profileService.GetAllbookingByUser(sessionStorage.getItem('userId')).subscribe({
      next: (res: any) => {
        this.bookingList = res.data
        console.log(this.bookingList);
      },
      error: (err: any) => {
        this.toastr.error(err.error.message)
      }
    })
  }

  deleteEnquiry(data:any){
    Swal.fire({
      title: 'Do you want to delete the enquiry?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.profileService.deleteenquiry(data).subscribe({
          next: (data: any) => {
            Swal.fire('Deleted', '', 'success')
            this.toastr.success(data.data)
            this.ngOnInit()
          },
          error: (err: any) => {
            console.log(err);
          }
        })
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
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
