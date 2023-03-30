import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  subscriptionForm: FormGroup = new FormGroup({})

  constructor(
    private _route: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private service: SharedService
  ) { }

  ngOnInit(): void {
    this.subscriptionForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  routeToProfile() {
    this._route.navigate(['/profile']);
  }

  submit() {
    if (this.subscriptionForm.invalid) {
      this.toastr.error('Invalid email or name')
      return
    }

    this.service.subscription(this.subscriptionForm.value).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message)
        this.subscriptionForm.reset()
      },
      error: (err: any) => {
        this.toastr.error(err.error.message)
      }
    })

  }

}
