import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripService } from '../jobs/trip.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  getInTouchFrom: FormGroup = new FormGroup({})

  constructor(private fb: FormBuilder, private service: TripService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.getInTouchFrom = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      contactnumber: [''],
      message: ['', Validators.required]
    })
  }

  sendMessage() {
    this.getInTouchFrom.markAllAsTouched()
    if (this.getInTouchFrom.invalid) {
      this.toastr.error("Please fill all details to send message")
      return
    }

    this.service.createEnquiry(this.getInTouchFrom.value).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message)
        this.getInTouchFrom.reset()
      },
      error: (err: any) => {
        this.toastr.error(err.error.message)
      }
    })
  }

}
