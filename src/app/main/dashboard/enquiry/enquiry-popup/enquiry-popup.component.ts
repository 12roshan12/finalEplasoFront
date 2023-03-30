import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { AdminService } from '../../dashboard.service';

@Component({
    selector: 'app-enquiry-pop',
    templateUrl: './enquiry-pop.component.html',
    styleUrls: ['./enquiry-pop.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class EnquiryPopupComponent implements OnInit {

    constructor(private dialog: MatDialogRef<EnquiryPopupComponent>, private service: AdminService,
        @Inject(MAT_DIALOG_DATA) public data: any,) { }

    ngOnInit(): void {
        this.dialog.disableClose = true;
    }
}