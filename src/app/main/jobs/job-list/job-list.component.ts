import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  jobTypes :any =['Expedition','Trek','City Visit','Saffari','Water','Air'];
  postedTime :any =['0-5','5-10','10-15','15-20','20+'];
  experience: any =['Fresh', '1-2 years', '2-5 years', '5+years'];
  form!: FormGroup;
  data: any;
  tripList:any[]=[]
  categoryList:any[]=[]
  imageEnvironmentUrl = environment.Main_Api + 'media/file/'

  constructor(
    private _fb: FormBuilder,
    private tripsrvice:TripService
  ) { }

  ngOnInit(): void {
    this.tripsrvice.getAllCategory().subscribe({
      next: (data: any) => {
        this.categoryList = data.data
      },
      error:(err:any)=>{

      }
    })
    this.tripsrvice.getAllTrip().subscribe({
      next: (data: any) => {
        this.tripList = data.data
      },
      error:(err:any)=>{

      }
    })
    this.createForm();
  }
  change(){
    console.log(this.form.value);
  }

  calculateDiscount(basePrice:any,offerPrice:any){
    let discount = ((basePrice - offerPrice) / basePrice) * 100
    return Math.round(discount)
  }

  createForm(){
    this.form = this._fb.group({
      searchText:[''],
      location: [''],
      radius: [100],
      category: [''],
      jobType: [''],
      postedDate: [''],
      priceRange: [2500]
    });
  }

}
