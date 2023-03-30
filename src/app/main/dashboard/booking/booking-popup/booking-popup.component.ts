import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { AdminService } from '../../dashboard.service';

@Component({
    selector: 'app-booking-pop',
    templateUrl: './booking-pop.component.html',
    styleUrls: ['./booking-pop.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class BookingPopupComponent implements OnInit {

    constructor(private dialog: MatDialogRef<BookingPopupComponent>, private service: AdminService,
        @Inject(MAT_DIALOG_DATA) public data: any,) { }

    ngOnInit(): void {
        this.dialog.disableClose = true;
    }
}