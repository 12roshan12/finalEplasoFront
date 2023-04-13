import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { AdminService } from '../../dashboard.service';
import * as moment from 'moment'
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-booking-pop',
    templateUrl: './booking-pop.component.html',
    styleUrls: ['./booking-pop.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class BookingPopupComponent implements OnInit {
    disableButton = false
    constructor(private dialog: MatDialogRef<BookingPopupComponent>, private service: AdminService, private toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: any,) { }

    ngOnInit(): void {
        this.dialog.disableClose = true;
        console.log(this.data);
    }

    approved() {
        this.disableButton = true
        let formobject = <any>{}
        formobject.id = this.data._id
        formobject.email = this.data.email
        formobject.name = this.data.name
        formobject.package = this.data.packageName
        formobject.totalTraveller = this.data.totalTraveller
        formobject.price = this.data.price
        formobject.date = moment(this.data.date).format('MMMM Do YYYY')

        this.service.bookingApproval(formobject).subscribe({
            next: (data: any) => {
                this.disableButton = false
                this.toastr.success(data.message)
                this.dialog.close('Approved')
            },
            error: (err: any) => {
                this.disableButton = false
                this.toastr.error(err.error.message)
            }
        })
    }

    rejected() {
        this.disableButton = true
        let formobject = <any>{}
        formobject.id = this.data._id
        formobject.email = this.data.email
        formobject.name = this.data.name
        formobject.package = this.data.packageName
        formobject.totalTraveller = this.data.totalTraveller
        formobject.price = this.data.price
        formobject.date = moment(this.data.date).format('MMMM Do YYYY')

        this.service.bookingRejection(formobject).subscribe({
            next: (data: any) => {
                this.disableButton = false
                this.toastr.success(data.message)
                this.dialog.close('Rejected')
            },
            error: (err: any) => {
                this.disableButton = false
                this.toastr.error(err.error.message)
            }
        })
    }
}