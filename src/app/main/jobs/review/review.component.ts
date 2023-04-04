import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripService } from '../trip.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReviewComponent implements OnInit {

  reviewForm: FormGroup = new FormGroup({})

  constructor(private fb: FormBuilder,
    private reviewService: TripService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialgRef: MatDialogRef<ReviewComponent>,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      tripId: [this.data],
      userid: [sessionStorage.getItem('userId'), Validators.required],
      user: [sessionStorage.getItem('user'), Validators.required],
      rating: ['', Validators.required],
      comment: ['', Validators.required],
    })
  }

  postComment() {
    this.reviewForm.markAllAsTouched()
    if (this.reviewForm.invalid) return
    this.reviewService.postReview(this.reviewForm.getRawValue()).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message)
        this.dialgRef.close('Success')
      },
      error: (err: any) => {
        this.toastr.error(err.error.message)
      }
    })
  }

}
