import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../dashboard.service';
import { EventPopupComponent } from './event-popup/notice-popup.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  routeData = [
    {
      'name': 'Event',
      'link': '/dashboard'
    }
  ]
  EventList:any = []

  constructor(private dialogRef: MatDialog,private service:AdminService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.GetAllevent().subscribe({
      next: (data: any) => {
        this.EventList = data.data
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  openPopup(data?: any) {
    let dialog = this.dialogRef.open(EventPopupComponent, {
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
    let formObject = <any>{}
    formObject.status = data.target.checked
    formObject.id =id
    this.service.toggleevent(formObject).subscribe({
      next: (data: any) => {
        this.toastr.success(data.data)
        this.ngOnInit()
      },
      error: (err: any) => {
        this.toastr.error(err.error.message)
      }
    })
  }

}
