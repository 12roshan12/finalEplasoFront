import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../dashboard.service';
import { BookingPopupComponent } from './booking-popup/booking-popup.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {


  routeData = [
    {
      'name': 'Booking',
      'link': '/dashboard'
    }
  ]
  bookingList:any = []

  constructor(private dialogRef: MatDialog,private service:AdminService) { }

  ngOnInit(): void {
    this.service.GetAllBooking().subscribe({
      next: (data: any) => {
        this.bookingList = data.data
        this.bookingList.sort((a:any, b:any) => b.updatedon.localeCompare(a.updatedon))

      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  openPopup(data?: any) {
    let dialog = this.dialogRef.open(BookingPopupComponent, {
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

  deleteGroup(id: any) {
    // this.GroupService.deleteGroup(id).subscribe({
    //   next: (data: any) => {
    //     console.log(data);
    //     this.toastr.success(data)
    //     this.ngOnInit()
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //     this.toastr.error(err.error.message)
    //   }
    // })
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
