import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { TripService } from '../trip.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  jobTypes: any = ['Expedition', 'Trek', 'City Visit', 'Saffari', 'Water', 'Air'];
  postedTime: any = ['0-5', '5-10', '10-15', '15-20', '20+'];
  experience: any = ['Fresh', '1-2 years', '2-5 years', '5+years'];
  form!: FormGroup;
  data: any;
  tripList: any[] = []
  sortedList: any[] = []
  categoryList: any[] = []
  imageEnvironmentUrl = environment.Main_Api + 'media/file/'
  sortIndex: any
  searchValue: any
  showCompressedFilter = false
  fetchedTrip: any;
  fetchedCategory: any;
  constructor(
    private _fb: FormBuilder,
    private tripsrvice: TripService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params: any) => {
      this.fetchedTrip = params?.trip
      this.fetchedCategory = params?.category
    })


    this.tripsrvice.getAllCategory().subscribe({
      next: (data: any) => {
        this.categoryList = data.data
      },
      error: (err: any) => {

      }
    })
    this.tripsrvice.getAllTrip().subscribe({
      next: (data: any) => {
        this.tripList = data.data
        let currentLang = sessionStorage.getItem('language')

        this.tripList = this.tripList.filter((e: any) => {

          if (currentLang === 'spain') {
            if (e.isSpanish == true) {
              return e
            }
          } else {
            if (e.isSpanish == false) {
              return e
            }
          }

        })

        console.log(this.tripList);


        this.sortedList = this.tripList

        if (this.fetchedTrip != null) {
          this.sortedList = this.tripList
          this.sortedList = this.sortedList.filter((data: any) => {
            if (data.name.toLowerCase().startsWith(this.fetchedTrip?.toLowerCase()) == true) {
              return data
            }
          })
          this.searchValue = this.fetchedTrip
        }

        if (this.fetchedCategory != null) {
          this.sortedList = this.tripList
          this.sortedList = this.sortedList.filter((data: any) => {
            if (data.category.toLowerCase().startsWith(this.fetchedCategory?.toLowerCase()) == true) {
              return data
            }
          })
        }

      },
      error: (err: any) => {

      }
    })
    this.createForm();
  }
  change() {
    console.log(this.form.value);
  }

  calculateDiscount(basePrice: any, offerPrice: any) {
    let discount = ((basePrice - offerPrice) / basePrice) * 100
    return Math.round(discount)
  }

  createForm() {
    this.form = this._fb.group({
      searchText: [''],
      location: [''],
      radius: [100],
      category: [''],
      jobType: [''],
      postedDate: [''],
      priceRange: [2500]
    });
  }

  sortList() {
    if (this.sortIndex == 'price') {
      this.sortedList = this.sortedList.sort((a: any, b: any) => {
        return Number(a?.price) - Number(b?.price)
      })
    }
    else if (this.sortIndex == 'days') {
      this.sortedList = this.sortedList.sort((a: any, b: any) => {
        return Number(a?.summary?.duration.split(" ")[0]) - Number(b?.summary?.duration.split(" ")[0])
      })
    }
    else {
      this.sortedList = this.sortedList.sort((a: any, b: any) => {
        if (a.isSpecialOffer < b.isSpecialOffer) {
          return 1;
        } else if (a.isSpecialOffer > b.isSpecialOffer) {
          return -1;
        } else {
          return 0;
        }
      })
    }
  }

  searchTrip(event: any) {
    this.searchValue = event?.target?.value
    this.sortedList = this.tripList
    this.sortedList = this.sortedList.filter((data: any) => {
      if (data.name.toLowerCase().startsWith(event?.target?.value?.toLowerCase()) == true) {
        return data
      }
    })
  }

  sliderSearch(e: any) {
    console.log(e.source._elementRef.nativeElement.innerText);

    if (e.source._elementRef.nativeElement.innerText == 'All') {
      this.sortedList = this.tripList
      return
    }
    this.sortedList = this.tripList
    this.sortedList = this.sortedList.filter((data: any) => {
      if (data.category.toLowerCase().startsWith(e.source._elementRef.nativeElement.innerText?.toLowerCase()) == true) {
        return data
      }
    })
  }

}
