import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../dashboard.service';
import { EnquiryPopupComponent } from './enquiry-popup/enquiry-popup.component';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent {


  routeData = [
    {
      'name': 'Enquiry',
      'link': '/dashboard'
    }
  ]
  enquiryList:any = []

  constructor(private dialogRef: MatDialog,private service:AdminService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.GetAllEnquiry().subscribe({
      next: (data: any) => {
        this.enquiryList = data.data
        this.enquiryList = this.enquiryList.sort((a: any, b: any) => (a.createdon < b.createdon) ? -1 : ((b.createdon < a.createdon) ? 1 : 0))
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  openPopup(data?: any) {
    let dialog = this.dialogRef.open(EnquiryPopupComponent, {
      disableClose:false,
      data: data?data:null,
      minWidth:'50vw',
    })

    dialog.afterClosed().subscribe((e: any) => {
      if(e !='')
      {
        this.ngOnInit()
      }
    })
  }

  deleteEnquiry(id: any) {
    Swal.fire({
      title: 'Do you want to delete the enquiry?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.service.deleteEnquiry(id).subscribe({
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

  statusChanged(data: any,id:any) {
    // let formObject = <any>{}
    // formObject.status = data.target.checked
    // formObject.id = id
    // this.GroupService.changeGroupStatus(formObject).subscribe({
    //   next: (data: any) => {
    //     this.toastr.success(data)
    //     this.ngOnInit()
    //   },
    //   error: (err: any) => {
    //     this.toastr.error(err.error.message)
    //   }
    // })
  }

}
