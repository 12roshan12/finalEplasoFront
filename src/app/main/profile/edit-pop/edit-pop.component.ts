import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AdminService } from '../../dashboard/dashboard.service';

@Component({
    selector: 'app-edit-pop-pop',
    templateUrl: './edit-pop.component.html',
    styleUrls: ['./edit-pop.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProfilePopUpComponent {

    @ViewChild('profileUpload') profileUpload: any

    profileForm: FormGroup = new FormGroup({})
    profilePicModel: any = ''
    imageTemp: any
    selectedCar!: number;
    categoryList: any = []
    tripList: any = []
    filteredTrip: any = []
    imageEnvironmentUrl = environment.Main_Api + 'media/file/'
    updateBoolean: boolean = false
    buttonDisabled = false

    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];

    constructor(private dialog: MatDialogRef<ProfilePopUpComponent>, private service: AdminService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private toastr: ToastrService,
        private fb: FormBuilder) { }

    ngOnInit(): void {
        this.dialog.disableClose = true;
        console.log(this.data)
        if (this.data != null) {
            this.updateBoolean = true
        }
        this.profileForm = this.fb.group({
            _id: [this.data ? this.data._id : ''],
            username: [this.data ? this.data.username : '',Validators.required],
            email: [this.data ? this.data.email : '',Validators.required],
            aboutMe: [this.data ? this.data.aboutMe : ''],
            contactNumber: [this.data ? this.data.contactNumber : '',Validators.required],
            profession: [this.data ? this.data.profession : '',Validators.required],
            address: [this.data ? this.data.address : '',Validators.required],
            image: [this.data ? this.data.image : '',Validators.required],
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
                this.profileForm.get('image')?.setValue(res.path)
            })
        }
    }

    clear() {
        this.imageTemp = null
    }


    submit() {
        this.profileForm.markAllAsTouched()
        if (this.profileForm.invalid)
        {
            this.toastr.error("Please fill all field and image")
            return
        } 
        this.buttonDisabled = true

        this.service.updateUser(this.profileForm.value).subscribe({
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
