import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthentictaionService } from '../authentication.service';
import { ConfirmPasswordValidator } from './password-validator';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup = new FormGroup({})

    constructor(private fb: FormBuilder,private service:AuthentictaionService,private toastr:ToastrService,private dialogref:MatDialogRef<RegisterComponent>) {

    }

    ngOnInit() {
        this.registerForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            email: ['', [Validators.required,Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
            contactNumber: [''],
        },
        {
            validator: ConfirmPasswordValidator("password", "confirmPassword")
          }
        )
    }

    register() {
        this.registerForm.markAllAsTouched()
        if (this.registerForm.invalid) return
        this.service.signUp(this.registerForm.value).subscribe({
            next:(data:any)=>{
                this.toastr.success(data.message)
                this.dialogref.close()
            },
            error:(err:any)=>{
                this.toastr.error(err.error.message)
            }
        })
        
    }

}