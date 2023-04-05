import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { LandingService } from '../../landing/landing.service';
import { TripService } from '../trip.service';
import { MatDialog } from '@angular/material/dialog';
import { ReviewComponent } from '../review/review.component';
@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.scss']
})
export class JobDescriptionComponent implements OnInit {
  innerWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 1023) {
      this.bookingDiv = false
      this.enquiryDiv = false
    }
    else {
      this.bookingDiv = true
      this.enquiryDiv = true
    }
  }

  bookingForm: FormGroup = new FormGroup({})
  enquiryFrom: FormGroup = new FormGroup({})
  tripList: any[] = []
  imageEnvironmentUrl = environment.Main_Api + 'media/file/'
  packageDetails: any
  price: any
  finalPrice: any
  showImageGallery: any = false
  token = sessionStorage.getItem('token')
  bookingDiv: boolean = true
  enquiryDiv: boolean = true


  constructor(private fb: FormBuilder,
    private dialogRef: MatDialog,
    private toastr: ToastrService, private service: TripService, private landingService: LandingService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {


    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth);
    if (this.innerWidth <= 1023) {
      this.bookingDiv = false
      this.enquiryDiv = false
    }
    else {
      this.bookingDiv = true
      this.enquiryDiv = true
    }

    this.route.paramMap.subscribe((e: any) => {
      let id = e.params.id
      this.service.getTripById(id).subscribe({
        next: (data: any) => {
          this.packageDetails = data.data
          this.bookingForm.get('packageId')?.setValue(this.packageDetails?._id)
          this.bookingForm.get('packageName')?.setValue(this.packageDetails?.name)
          this.enquiryFrom.get('packageId')?.setValue(this.packageDetails?._id)
          this.enquiryFrom.get('packageName')?.setValue(this.packageDetails?.name)
          this.price = this.packageDetails.offerPrice ? this.packageDetails.offerPrice : this.packageDetails.price
          this.finalPrice = this.price
        }
      })
    })

    this.bookingForm = this.fb.group({
      _id: [''],
      packageId: [''],
      packageName: [''],
      userId: [sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : ''],
      name: ['', Validators.required],
      email: ['', Validators.required],
      contactnumber: ['', Validators.required],
      totalTraveller: ['', Validators.required],
      address: ['', Validators.required],
      date: ['', Validators.required],
      price: ['', Validators.required],
      message: [null]
    })

    this.enquiryFrom = this.fb.group({
      _id: [''],
      packageId: [''],
      packageName: [''],
      userId: [sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : ''],
      name: ['', Validators.required],
      email: ['', Validators.required],
      expectedPrice: ['', Validators.required],
      contactnumber: ['', Validators.required],
      totalTraveller: ['', Validators.required],
      address: ['', Validators.required],
      date: ['', Validators.required],
      message: [null]
    })

    this.newMethod().landingService.getAllTrip().subscribe({
      next: (data: any) => {
        this.tripList = data.data
        this.tripList = this.tripList.splice(0, 4)
      }
    })
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  toNumber(data: any) {
    return Number(data)
  }

  calculatePrice(e: any) {
    this.finalPrice = this.price
    this.finalPrice = this.toNumber(e.target.value) * this.toNumber(this.price)
    console.log(this.finalPrice);

  }

  openMedia(data: any) {

    if (data == 'video') {
      window.open(this.packageDetails?.video)
      return
    }
    else {
      this.showImageGallery = true
    }
  }

  closeCrousel() {
    this.showImageGallery = false
  }

  calculateDiscount(basePrice: any, offerPrice: any) {
    let discount = ((basePrice - offerPrice) / basePrice) * 100
    return Math.round(discount)
  }

  private newMethod() {
    return this;
  }

  placeBooking() {

    this.bookingForm.get('price')?.setValue(this.finalPrice)
    if (this.bookingForm.invalid) {
      this.toastr.error("Please fill all details to place request")
      return
    }
    this.service.createBooking(this.bookingForm.value).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message)
        this.bookingForm.reset()
      },
      error: (err: any) => {
        this.toastr.error(err.error.message)
      }
    })

  }

  placeEnquiry() {
    this.enquiryFrom.get('expectedPrice')?.setValue(this.finalPrice)
    if (this.enquiryFrom.invalid) {
      this.toastr.error("Please fill all details to place request")
      return
    }

    this.service.createEnquiry(this.enquiryFrom.value).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message)
        this.enquiryFrom.reset()
      },
      error: (err: any) => {
        this.toastr.error(err.error.message)
      }
    })
  }

  openReviewPopup(data: any) {

    if (this.token == undefined) {
      this.toastr.error("Please login to post a comment")
      return
    }

    let dialog = this.dialogRef.open(ReviewComponent, {
      disableClose: false,
      minWidth: '50vw',
      data: data
    })

    dialog.afterClosed().subscribe((e: any) => {
      if (e != '') {
        this.ngOnInit()
      }
    })
  }

}
