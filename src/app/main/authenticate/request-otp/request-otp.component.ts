import { Component, ElementRef, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthentictaionService } from '../authentication.service';
import { ConfirmPasswordValidator } from '../register/password-validator';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
    selector: 'app-request-otp',
    templateUrl: './request-otp.component.html',
    styleUrls: ['./request-otp.component.scss']
})
export class RequestOTPComponent implements OnInit {
    buttonDisable: boolean = false
    otpsend: boolean = false
    registerForm: FormGroup = new FormGroup({})
    second: any 

    constructor(private fb: FormBuilder, private service: AuthentictaionService,
        @Inject(MAT_DIALOG_DATA) public type: any,
        private toastr: ToastrService, private dialogref: MatDialogRef<RequestOTPComponent>, private dialogg: MatDialog) {

    }

    ngOnInit() {
        this.registerForm = this.fb.group({
            email: ['', [Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            otp: [''],
        })
    }

    requestOtpFun() {
        this.registerForm.markAllAsTouched()
        if (this.registerForm.invalid) return
        this.buttonDisable = true
        this.otpsend = false
        const formObject = <any>{}
        formObject.email = this.registerForm.value.email
        formObject.type = this.type.type

        this.service.requestOtp(formObject).subscribe({
            next: (data: any) => {
                this.toastr.success(data.message)
                this.otpsend = true
                this.second = 60
                setInterval(() => {
                    if (this.second != 0) {
                        this.second = this.second - 1
                    }
                },1000)
                setTimeout(() => {
                    this.buttonDisable = false
                }, 60000)
            },
            error: (err: any) => {
                this.toastr.error(err.error.message)
            }
        })
    }

    verifyOtpFun(e: any) {
        if (e.target.value.length == 6) {
            const formObject = <any>{}
            formObject.email = this.registerForm.value.email
            formObject.otp = this.registerForm.value.otp
            console.log(formObject)
            this.service.verifyOtp(formObject).subscribe({
                next: (data: any) => {
                    this.toastr.success(data.message)
                    this.dialogref.close()

                    if (this.type.type == "forgot-password") {
                        let dialog = this.dialogg.open(ForgotPasswordComponent, {
                            disableClose: true,
                            minWidth: '50vw',
                            data: { 'email': this.registerForm.value.email }
                        })
                        dialog.afterClosed().subscribe((e: any) => {
                        })
                    }

                },
                error: (err: any) => {
                    this.toastr.error(err.error.message)
                }
            })
        }
    }

}