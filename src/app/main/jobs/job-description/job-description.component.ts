import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { LandingService } from '../../landing/landing.service';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.scss']
})
export class JobDescriptionComponent implements OnInit {

  bookingForm: FormGroup = new FormGroup({})
  enquiryFrom: FormGroup = new FormGroup({})
  tripList: any[] = []
  imageEnvironmentUrl = environment.Main_Api + 'media/file/'
  packageDetails: any
  price: any
  finalPrice: any
  showImageGallery: any = false

  constructor(private fb: FormBuilder, private toastr: ToastrService, private service: TripService, private landingService: LandingService, private route: ActivatedRoute) { }

  ngOnInit(): void {

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

  toNumber(data: any) {
    return Number(data)
  }

  calculatePrice(e: any) {
    this.finalPrice = this.price
    this.finalPrice = this.toNumber(e.target.value) * this.toNumber(this.price)
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

  closeCrousel(){
    this.showImageGallery = false
  }

  calculateDiscount(basePrice:any,offerPrice:any){
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
    this.bookingForm.get('expectedPrice')?.setValue(this.finalPrice)

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



}
