import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { AdminService } from '../../dashboard.service';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ProfileService } from 'src/app/main/profile/profile.service';
import { BlogAdminPopUpComponent } from '../../blog/blog-popup/pop.component';

@Component({
    selector: 'app-guidline-pop',
    templateUrl: './guidline-pop.component.html',
    styleUrls: ['./guidline-pop.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class GuidlinePopupComponent implements OnInit {

    @ViewChild('profileUpload') profileUpload: any

    blogForm: FormGroup = new FormGroup({})
    profilePicModel: any = ''
    imageTemp: any
    selectedCar!: number;
    categoryList: any = []
    tripList: any = []
    filteredTrip:any = []

    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];
    userDetails:any

    constructor(private dialog: MatDialogRef<BlogAdminPopUpComponent>, private service: AdminService,private profileService:ProfileService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private toastr:ToastrService,
        private fb: FormBuilder) { }
    updateBoolean: boolean = false
    buttonDisabled = false

    ngOnInit(): void {

        this.profileService.getUserDetails(sessionStorage.getItem('userId')).subscribe({
            next: (res: any) => {
              this.userDetails = res.data
              this.blogForm.get('author')?.get('name')?.setValue(this.userDetails.username)
              this.blogForm.get('author')?.get('image')?.setValue(this.userDetails.image)
              this.blogForm.get('author')?.get('profession')?.setValue(this.userDetails.profession)
            },
            error: (err: any) => {
            }
          })

        this.fetchLoadValues()
        this.dialog.disableClose = true;
        console.log(this.data)
        if (this.data != null) {
            this.updateBoolean = true
        }
        this.blogForm = this.fb.group({
            _id: [this.data ? this.data._id : ''],
            name: [this.data ? this.data.name : '', Validators.required],
            image: [this.data ? this.data.image : '', Validators.required],
            description: [this.data ? this.data.description : '', Validators.required],
            isGuidline: [this.data ? this.data.isGuidline : false, Validators.required],
            category: [this.data ? this.data.category : ''],
            trip: [this.data ? this.data.trip : ''],
            author: this.fb.group({
                name:[],
                id:[sessionStorage.getItem('userId')],
                image:[],
                profession:[],
            }),
        })
        if (this.updateBoolean == true) {
            this.profilePicModel = environment.Main_Api + 'media/file/' + this.data.image
        }
    }

    fetchLoadValues(){
        this.service.GetAllCategory().subscribe((res: any) => {
            this.categoryList = res.data
        })
        this.service.getAllTrip().subscribe((res: any) => {
            this.tripList = res.data
            this.filteredTrip = res.data
        })
    }

    fetchTrip(data:any){
        console.log(data);
        this.filteredTrip = this.tripList
        this.filteredTrip = this.filteredTrip.filter((e:any)=>{
            return e.category == data
        })
    }

    changeProfilePicture(event: any) {
        const reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);
            reader.onload = () => {
                var imageSrc = reader.result as string;
                // this.profilePicModel = imageSrc
            };
            var selectedFiles = event.target.files;
            var currentFileUpload = selectedFiles.item(0);
            let formData = new FormData()
            formData.append('image', currentFileUpload);
            formData.append('labelName', currentFileUpload.name);
            this.service.uploadPhoto(formData).subscribe((res: any) => {
                res.path = res.path.replace('"', '')
                res.path = res.path.replace('"', '')
                this.profilePicModel = environment.Main_Api + 'media/file/' + res.path
                this.blogForm.get('image')?.setValue(res.path)
            })
        }
    }

    clear() {
        this.profilePicModel = ''
        this.imageTemp = null
    }


    submit() {
        console.log(this.blogForm.value);

        if (this.blogForm.invalid) return
        this.buttonDisabled = true

        this.service.createblog(this.blogForm.value).subscribe({
            next: (data: any) => {
                this.buttonDisabled = false
                this.toastr.success(data.message)
                this.dialog.close('Success')
                this.ngOnInit()
            },
            error: (err: any) => {
                this.buttonDisabled = false
                console.log(err);
                this.toastr.error(err.error.message)
            }
        })
    }

    close() {
        this.dialog.close()
    }

}