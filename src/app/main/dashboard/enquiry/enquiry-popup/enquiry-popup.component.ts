import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { AdminService } from '../../dashboard.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-enquiry-pop',
    templateUrl: './enquiry-pop.component.html',
    styleUrls: ['./enquiry-pop.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class EnquiryPopupComponent implements OnInit {

    responseText: any = ''
    disableButton = false

    constructor(private dialog: MatDialogRef<EnquiryPopupComponent>, private service: AdminService, private toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: any,) { }

    ngOnInit(): void {
        this.dialog.disableClose = true;
    }

    deleteEnquiry() {
        this.service.deleteEnquiryMessage(this.data._id).subscribe({
            next: (data: any) => {
                this.toastr.success(data.message)
                this.dialog.close('Success')
            },
            error: (err: any) => {
                console.log(err);
            }
        })
    }

    enquiryResponse() {
        if (this.responseText == '') {
            this.toastr.error('Please enter response message')
            return
        }
        this.disableButton = true
        let formObject = <any>{}
        formObject.id = this.data._id
        formObject.name = this.data.name
        formObject.package = this.data.packageName
        formObject.enquiryMessage = this.responseText
        formObject.email = this.data.email

        this.service.enquiryResponse(formObject).subscribe({
            next: (data: any) => {
                this.disableButton = false

                this.toastr.success(data.message)
                this.dialog.close('success')
            },
            error: (err: any) => {
                this.disableButton = false

                console.log(err);
            }
        })
    }
}