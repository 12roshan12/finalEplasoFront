import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AdminService } from '../dashboard.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss']
})
export class TripComponent implements OnInit {

  imageEnvironmentUrl = environment.Main_Api + 'media/file/'
  tripList: any[] = []
  routeData = [
    {
      'name': 'Trip',
      'link': '/dashboard'
    }
  ]
  categoryList: any[]=[]

  constructor(private dialogRef: MatDialog, private router: Router, private service: AdminService, private toastr: ToastrService) { }

  ngOnInit(): void {

    this.service.GetAllCategory().subscribe({
      next: (data: any) => {
        this.categoryList = data.data
      },
      error: (err: any) => {
      }
    })

    this.service.getAllTrip().subscribe({
      next: (data: any) => {
        this.tripList = data.data
      },
      error: (err: any) => {
        console.log(err);
      }
    })

  }

  openPopup() {
    this.router.navigateByUrl('/dashboard/trip-add')
  }

  editGroup(data: any) {

  }

  deleteGroup(id: any) {

  }

  statusChanged(data: any, id: any) {

  }
  deleteTirp(data: any) {

    Swal.fire({
      title: 'Do you want to delete the trip?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Cancel`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.service.deleteTrip(data).subscribe({
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

  calculateDiscount(basePrice: any, offerPrice: any) {
    if(basePrice.toString().startsWith("$")) {
      basePrice = basePrice.toString().substring(1)
    }

    if(offerPrice.toString().startsWith("$")) {
      offerPrice = offerPrice.toString().substring(1)
    }
     
    let discount = ((basePrice - offerPrice) / basePrice) * 100
    return Math.round(discount)
  }

}
