import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../dashboard.service';
import { GuidlinePopupComponent } from './guidline-popup/guidline-popup.component';

@Component({
  selector: 'app-guidline',
  templateUrl: './guidline.component.html',
  styleUrls: ['./guidline.component.scss']
})
export class GuidlineComponent {

  routeData = [
    {
      'name': 'Guidline',
      'link': '/dashboard'
    }
  ]
  guidlineList:any = []

  constructor(private dialogRef: MatDialog,private service:AdminService) { }

  ngOnInit(): void {
    this.service.GetAllguidline().subscribe({
      next: (data: any) => {
        this.guidlineList = data.data
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  openPopup(data?: any) {
    let dialog = this.dialogRef.open(GuidlinePopupComponent, {
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