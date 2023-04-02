import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthentictaionService } from '../authentication.service';
import { ConfirmPasswordValidator } from '../register/password-validator';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  buttonDisable: boolean = false
  otpsend: boolean = false
  forgotpasswordForm: FormGroup = new FormGroup({})

  constructor(private fb: FormBuilder, private service: AuthentictaionService,
    @Inject(MAT_DIALOG_DATA) public type: any,
    private toastr: ToastrService, private dialogref: MatDialogRef<ForgotPasswordComponent>) {

  }

  ngOnInit() {
    this.forgotpasswordForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
      {
        validator: ConfirmPasswordValidator("password", "confirmPassword")
      })
  }

  changepasswordFun() {
    
    this.forgotpasswordForm.markAllAsTouched()
    if (this.forgotpasswordForm.invalid) return

    let formObject = <any>{}
    formObject.email = this.type.email
    formObject.password = this.forgotpasswordForm.value.password

    this.service.changePassword(formObject).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message)
        this.dialogref.close()
      },
      error: (err: any) => {
        console.log(err)
        // this.toastr.error(err.error.message)
      }
    })
  }

}