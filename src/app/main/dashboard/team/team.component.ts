import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../dashboard.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { TeamPopupComponent } from './team-popup/team-popup.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TeamComponent implements OnInit {

  routeData = [
    {
      'name': 'Team member',
      'link': '/dashboard'
    }
  ]
  tripList: any = []

  constructor(private dialogRef: MatDialog, private service: AdminService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.GetAllTeam().subscribe({
      next: (data: any) => {
        this.tripList = data.data
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  openPopup(data?: any) {
    let dialog = this.dialogRef.open(TeamPopupComponent, {
      disableClose: false,
      data: data ? data : null,
      minWidth: '50vw',
    })

    dialog.afterClosed().subscribe((e: any) => {
      if (e != '') {
        this.ngOnInit()
      }
    })
  }

  deleteTeam(id: any) {

    Swal.fire({
      title: 'Do you want to delete the team member?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.service.deleteTeam(id).subscribe({
          next: (data: any) => {
            this.toastr.success(data.data)
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

  statusChanged(data: any, id: any) {
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
