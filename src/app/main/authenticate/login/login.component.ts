import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthentictaionService } from '../authentication.service';
import { RequestOTPComponent } from '../request-otp/request-otp.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('passwordInput') passwordInput: any;
  @Output() login = new EventEmitter<boolean>();

  form!: FormGroup;
  isPassVisible: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private dialogRef: MatDialog,
    private _route: Router,
    private service: AuthentictaionService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      password: ['', Validators.required]
    })
  }

  openPopup(data?: any) {
    let dialog = this.dialogRef.open(RegisterComponent, {
      disableClose: true,
      minWidth: '50vw',
    })
    dialog.afterClosed().subscribe((e: any) => {
    })
  }

  forgotPassword(data?: any) {
    let dialog = this.dialogRef.open(RequestOTPComponent, {
      disableClose: true,
      minWidth: '35vw',
      data: { 'type': 'forgot-password' }
    })
    dialog.afterClosed().subscribe((e: any) => {
    })
  }

  loginSubmit() {
    if (this.form.invalid) return
    this.service.signIn(this.form.value).subscribe({
      next: (data: any) => {
        console.log(data);
        this.login.emit(true);
        sessionStorage.setItem('token', data.token)
        sessionStorage.setItem('user', data.user)
        sessionStorage.setItem('role', data.role)
        sessionStorage.setItem('email', data.userMail)
        sessionStorage.setItem('userId', data.id)
        if (data.role == 'admin') {
          this._route.navigate(['/dashboard']);
        } else {
          this._route.navigate(['/']);
        }
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error(err.error.message)
      }
    })
  }

  tooglePassIcon() {
    this.isPassVisible = !this.isPassVisible;
    this.passwordInput.nativeElement.type = this.isPassVisible ? 'text' : 'password';
  }

}
