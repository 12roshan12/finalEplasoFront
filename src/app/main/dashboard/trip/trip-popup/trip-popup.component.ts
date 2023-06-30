import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdminService } from '../../dashboard.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-trip-pop',
    templateUrl: './trip-pop.component.html',
    styleUrls: ['./trip-pop.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class TripPopupComponent implements OnInit {

    addOnBlur = true;
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    inclusions: any[] = ['Food', 'Hotels', 'Guide'];
    exclusions: any[] = ['Food', 'Hotels', 'Guide'];
    additionalInclusions: any[] = ['Food', 'Hotels', 'Guide'];
    tripHighlightss:any[]=[]

    imageGalleryList: any = []
    categotyList: any = []
    userList: any = []
    galleryImageTemp: any
    tripForm: FormGroup = new FormGroup({})
    data: any;
    imageEnvironmentUrl = environment.Main_Api + 'media/file/'
    bannerImageModel: any = '';
    bannerImageTemp = null;
    DetailImageModel: any = '';
    DetailImageTemp = null;
    MapImageTemp: any;
    MapImageModel: any;
    constructor(
        private route: ActivatedRoute,
        private service: AdminService,
        private toastr: ToastrService,
        private router: Router,
        private fb: FormBuilder) {
        this.tripForm = this.fb.group({
            _id: [''],
            name: ['', Validators.required],
            category: ['', Validators.required],
            video: ['', Validators.required],
            price: ['', Validators.required],
            pax2Price: [''],
            pax5price: [''],
            pax10price: [''],
            pax15price: [''],
            pax16price: [''],
            summary: this.getSummaryFrom(),
            isSpecialOffer: ['', Validators.required],
            isSpanish: ['', Validators.required],
            offerPrice: ['', Validators.required],
            description: ['', Validators.required],
            bannerImage: ['', Validators.required],
            mapImage: [''],
            tripImage: ['', Validators.required],
            itinerary: this.getIteniraryFrom(),
            inclusion: new FormArray([]),
            exclusion: new FormArray([]),
            optionalInclusion: new FormArray([]),
            tripHighlight: new FormArray([]),
            aboutTrip: new FormArray([this.getAboutTripDetail()]),
            faq: new FormArray([this.getFaqDetail()]),
            customerReview: new FormArray([]),
            imageGallery: this.fb.array([])
        })
    }
    updateBoolean: boolean = false

    ngOnInit(): void {

        this.service.getAllUser().subscribe({
            next: (data: any) => {
                this.userList = data.data
            },
            error: (err: any) => {
                
            }
        })

        this.service.GetAllCategory().subscribe({
            next: (data: any) => {
                this.categotyList = data.data
            },
            error: (error: any) => {
            }
        })

        this.route.paramMap.subscribe((params: any) => {
            console.log(params);
            if (params.params.id) {
                this.service.getAllTripById(params.params.id).subscribe({
                    next: (data: any) => {
                        console.log(data);
                        this.updateBoolean = true
                        this.data = data.data
                        this.buildFrom(this.data)
                    },
                    error: (error: any) => {
                        console.log(error);
                    }
                })
            }
            else {
                this.buildFrom()
            }
        })
    }

    buildFrom(elem?: any) {

        this.tripForm = this.fb.group({
            _id: [elem ? elem._id : ''],
            name: [elem ? elem.name : '', Validators.required],
            category: [elem ? elem.category : '', Validators.required],
            video: [elem ? elem.video : ''],
            price: [elem ? elem.price : '', Validators.required],
            pax2Price: [elem ? elem.pax2Price : ''],
            pax5price: [elem ? elem.pax5price : ''],
            pax10price: [elem ? elem.pax10price : ''],
            pax15price: [elem ? elem.pax15price : ''],
            pax16price: [elem ? elem.pax16price : ''],
            summary: this.getSummaryFrom(elem),
            isSpecialOffer: [elem ? elem.isSpecialOffer : false],
            isSpanish: [elem ? elem.isSpanish : false],
            offerPrice: [elem ? elem.offerPrice : ''],
            description: [elem ? elem.description : '', Validators.required],
            bannerImage: [elem ? elem.bannerImage : '', Validators.required],
            mapImage: [elem.mapImage ? elem.mapImage : ''],
            tripImage: [elem ? elem.tripImage : '', Validators.required],
            itinerary: this.getIteniraryFrom(),
            inclusion: new FormArray([]),
            exclusion: new FormArray([]),
            optionalInclusion: new FormArray([]),
            tripHighlight: new FormArray([]),
            aboutTrip: new FormArray([this.getAboutTripDetail()]),
            faq: new FormArray([this.getFaqDetail()]),
            customerReview: new FormArray([]),
            imageGallery: this.fb.array([])
        })

        if (this.data) {
            this.tripForm.get('itinerary')?.get('description')?.setValue(this.data.itinerary.description)

            this.ItineraryDetails.clear()
            for (let i = 0; i < this.data?.itinerary?.details.length; i++) {
                this.ItineraryDetails.push(this.getIteniraryDetailFrom(this.data.itinerary.details[i]))
            }

            this.FaqDetails.clear()
            for (let i = 0; i < this.data?.faq?.length; i++) {
                this.FaqDetails.push(this.getFaqDetail(this.data.faq[i]))
            }

            this.TripDetails.clear()
            for (let i = 0; i < this.data?.aboutTrip?.length; i++) {
                this.TripDetails.push(this.getAboutTripDetail(this.data.aboutTrip[i]))
            }

            this.reviewDetails.clear()
            for (let i = 0; i < this.data?.customerReview?.length; i++) {
                this.reviewDetails.push(this.getCustomerReview(this.data.customerReview[i]))
            }

            this.inclusions = this.data?.inclusion
            this.exclusions = this.data?.exclusion
            this.additionalInclusions = this.data?.optionalInclusion
            this.tripHighlightss = this.data?.tripHighlight

            for (let i = 0; i < this.data.imageGallery.length; i++) {
                this.ImageArray.push(this.fb.control(this.data.imageGallery[i]))
            }
        }
    }

    getSummaryFrom(elem?: any) {
        return this.fb.group({
            duration: [elem?.summary ? elem?.summary.duration : '', Validators.required],
            destination: [elem?.summary ? elem?.summary.destination : '', Validators.required],
            startPoint: [elem?.summary ? elem?.summary.startPoint : '', Validators.required],
            endPoint: [elem?.summary ? elem?.summary.endPoint : '', Validators.required],
            groupSize: [elem?.summary ? elem?.summary.groupSize : '', Validators.required],
            difficulty: [elem?.summary ? elem?.summary.difficulty : '', Validators.required],
            meals: [elem?.summary ? elem?.summary.meals : '', Validators.required],
            accomodation: [elem?.summary ? elem?.summary.accomodation : '', Validators.required],
            activities: [elem?.summary ? elem?.summary.activities : '', Validators.required],
            maxaltitude: [elem?.summary ? elem?.summary.maxaltitude : '', Validators.required],
            bestSeason: [elem?.summary ? elem?.summary.bestSeason : '', Validators.required],
        })
    }

    getIteniraryFrom() {
        return this.fb.group({
            description: [this.data ? this.data.itinerary.description : ''],
            details: this.fb.array([this.getIteniraryDetailFrom()])
        })
    }

    get ItineraryDetails() {
        return this.tripForm.get('itinerary')?.get('details') as FormArray
    }

    getIteniraryDetailFrom(elem?: any) {
        return this.fb.group({
            head: [elem ? elem.head : ''],
            headDetails: [elem ? elem.headDetails : ''],
            mode: [elem ? elem.mode : ''],
            routeItinerary: [elem ? elem.routeItinerary : ''],
            elevation: [elem ? elem.elevation : ''],
            duration: [elem ? elem.duration : ''],
            overnight: [elem ? elem.overnight : ''],
            included: [elem ? elem.included : ''],
            activity: [elem ? elem.activity : ''],
            activityDuration: [elem ? elem.activityDuration : ''],
            accomodation: [elem ? elem.accomodation : ''],
        })
    }

    addItinary() {
        this.ItineraryDetails.push(this.getIteniraryDetailFrom())
    }

    removeItinerary(index: any) {
        if (this.ItineraryDetails.length > 1) this.ItineraryDetails.removeAt(index)
    }

    getAboutTripDetail(elem?: any) {
        return this.fb.group({
            head: [elem ? elem.head : ''],
            headDetails: [elem ? elem.headDetails : ''],
        })
    }

    get TripDetails() {
        return this.tripForm.get('aboutTrip') as FormArray
    }

    addAboutTrip() {
        this.TripDetails.push(this.getAboutTripDetail())
    }

    removeAboutTrip(index: any) {
        if (this.TripDetails.length > 1) this.TripDetails.removeAt(index)
    }

    getFaqDetail(elem?: any) {
        return this.fb.group({
            head: [elem ? elem.head : ''],
            headDetails: [elem ? elem.headDetails : ''],
        })
    }

    get FaqDetails() {
        return this.tripForm.get('faq') as FormArray
    }

    addFAQDetails() {
        this.FaqDetails.push(this.getFaqDetail())
    }

    removeFAQDetails(index: any) {
        if (this.FaqDetails.length > 1) this.FaqDetails.removeAt(index)
    }

    getCustomerReview(elem?: any) {
        console.log(elem);
        
        return this.fb.group({
            user: [elem ? elem.user : ''],
            rating: [elem ? elem.rating : ''],
            comment: [elem ? elem.comment : ''],
        })
    }

    get reviewDetails() {
        return this.tripForm.get('customerReview') as FormArray
    }

    addReviews() {
        this.reviewDetails.push(this.getCustomerReview())
    }

    removeReview(index: any) {
        this.reviewDetails.removeAt(index)
    }

    get InclusionArray() {
        return this.tripForm.controls['inclusion'] as FormArray;
    }

    get ExclusionArray() {
        return this.tripForm.controls['exclusion'] as FormArray;
    }

    get AdditionalInclusionArray() {
        return this.tripForm.controls['optionalInclusion'] as FormArray;
    }

    get TripHiglightsArray() {
        return this.tripForm.controls['tripHighlight'] as FormArray;
    }


    submit() {
        console.log(this.tripForm);
        console.log(this.tripForm.value);
        this.tripForm.markAllAsTouched()
        if (this.tripForm.invalid) return
        for (let i = 0; i < this.inclusions.length; i++) {
            this.InclusionArray.push(this.fb.control(this.inclusions[i]))
        }
        for (let i = 0; i < this.exclusions.length; i++) {
            this.ExclusionArray.push(this.fb.control(this.exclusions[i]))
        }

        for (let i = 0; i < this.tripHighlightss?.length; i++) {
            this.TripHiglightsArray.push(this.fb.control(this.tripHighlightss[i]))
        }

        for (let i = 0; i < this.additionalInclusions?.length; i++) {
            this.AdditionalInclusionArray.push(this.fb.control(this.additionalInclusions[i]))
        }

     
        

        this.service.createTrip(this.tripForm.value).subscribe({
            next: (data: any) => {
                this.toastr.success(data.message)
                this.router.navigate(['/dashboard/trip'])
            },
            error: (err: any) => {
                this.toastr.error(err.error.message)
            }
        })
    }

    close() {
        window.history.back()
    }


    changeBannerImage(event: any) {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);
            reader.onload = () => {
                var imageSrc = reader.result as string;
                this.bannerImageModel = imageSrc
            };
            var selectedFiles = event.target.files;
            var currentFileUpload = selectedFiles.item(0);
            let formData = new FormData()
            formData.append('image', currentFileUpload);
            formData.append('labelName', currentFileUpload.name);
            this.service.uploadPhoto(formData).subscribe((res: any) => {
                res.path = res.path.replace('"', '')
                res.path = res.path.replace('"', '')
                this.bannerImageModel = environment.Main_Api + 'media/file/' + res.path
                this.tripForm.get('bannerImage')?.setValue(res.path)
            })
        }
    }

    clearBannerImage() {
        this.tripForm.get('bannerImage')?.setValue('')
        this.bannerImageTemp = null
    }

    changeDetailImage(event: any) {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);
            reader.onload = () => {
                var imageSrc = reader.result as string;
                this.DetailImageModel = imageSrc
            };
            var selectedFiles = event.target.files;
            var currentFileUpload = selectedFiles.item(0);
            let formData = new FormData()
            formData.append('image', currentFileUpload);
            formData.append('labelName', currentFileUpload.name);
            this.service.uploadPhoto(formData).subscribe((res: any) => {
                res.path = res.path.replace('"', '')
                res.path = res.path.replace('"', '')
                this.DetailImageModel = environment.Main_Api + 'media/file/' + res.path
                this.tripForm.get('tripImage')?.setValue(res.path)
            })
        }
    }

    clearDetailImage() {
        this.tripForm.get('tripImage')?.setValue('')
        this.DetailImageTemp = null
    }

    
    changeMapImage(event: any) {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);
            reader.onload = () => {
                var imageSrc = reader.result as string;
                this.MapImageModel = imageSrc
            };
            var selectedFiles = event.target.files;
            var currentFileUpload = selectedFiles.item(0);
            let formData = new FormData()
            formData.append('image', currentFileUpload);
            formData.append('labelName', currentFileUpload.name);
            this.service.uploadPhoto(formData).subscribe((res: any) => {
                res.path = res.path.replace('"', '')
                res.path = res.path.replace('"', '')
                this.MapImageModel = environment.Main_Api + 'media/file/' + res.path
                this.tripForm.get('mapImage')?.setValue(res.path)
            })
        }
    }

    clearMapImage() {
        this.tripForm.get('mapImage')?.setValue('')
        this.MapImageTemp = null
    }

    get ImageArray() {
        return this.tripForm.controls['imageGallery'] as FormArray;
    }

    handleGalleryImage(event: any) {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);
            reader.onload = () => {
                var imageSrc = reader.result as string;
               
            };
            var selectedFiles = event.target.files;
            var currentFileUpload = selectedFiles.item(0);
            let formData = new FormData()
            formData.append('image', currentFileUpload);
            formData.append('labelName', currentFileUpload.name);
            this.service.uploadPhoto(formData).subscribe((res: any) => {
                res.path = res.path.replace('"', '')
                res.path = res.path.replace('"', '')
                console.log(res);
                this.ImageArray.push(this.fb.control(res.path))
            })
            this.galleryImageTemp = null
        }
    }

    clearGalleryImage(index: any) {
        this.ImageArray.removeAt(index)
    }



    addInclusion(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        if (value) {
            this.inclusions.push(value);
        }
        event.chipInput!.clear();
    }

    removeInclusion(inclusion: any): void {
        const index = this.inclusions.indexOf(inclusion);
        if (index >= 0) {
            this.inclusions.splice(index, 1);
        }
    }

    editInclusion(inclusion: any, event: MatChipEditedEvent) {
        const value = event.value.trim();
        if (!value) {
            this.removeInclusion(inclusion);
            return;
        }
        const index = this.inclusions.indexOf(inclusion);
        if (index >= 0) {
            this.inclusions[index] = value;
        }
    }

    addAdditionalInclusion(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        if (value) {
            this.additionalInclusions.push(value);
        }
        event.chipInput!.clear();
    }

    removeAdditionalInclusion(inclusion: any): void {
        const index = this.additionalInclusions.indexOf(inclusion);
        if (index >= 0) {
            this.additionalInclusions.splice(index, 1);
        }
    }

    editAdditionalInclusion(inclusion: any, event: MatChipEditedEvent) {
        const value = event.value.trim();
        if (!value) {
            this.removeAdditionalInclusion(inclusion);
            return;
        }
        const index = this.additionalInclusions.indexOf(inclusion);
        if (index >= 0) {
            this.additionalInclusions[index] = value;
        }
    }


    addExclusion(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        if (value) {
            this.exclusions.push(value);
        }
        event.chipInput!.clear();
    }

    editExclusion(inclusion: any, event: MatChipEditedEvent) {
        const value = event.value.trim();
        if (!value) {
            this.removeInclusion(inclusion);
            return;
        }
        const index = this.exclusions.indexOf(inclusion);
        if (index >= 0) {
            this.exclusions[index] = value;
        }
    }

    removeExclusion(inclusion: any): void {
        const index = this.exclusions.indexOf(inclusion);
        if (index >= 0) {
            this.exclusions.splice(index, 1);
        }
    }

    addTripHighlights(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        if (value) {
            this.tripHighlightss.push(value);
        }
        event.chipInput!.clear();
    }

    editTripHighlights(inclusion: any, event: MatChipEditedEvent) {
        const value = event.value.trim();
        if (!value) {
            this.removeInclusion(inclusion);
            return;
        }
        const index = this.tripHighlightss.indexOf(inclusion);
        if (index >= 0) {
            this.tripHighlightss[index] = value;
        }
    }

    removeTripHighlights(inclusion: any): void {
        const index = this.tripHighlightss.indexOf(inclusion);
        if (index >= 0) {
            this.tripHighlightss.splice(index, 1);
        }
    }


}
