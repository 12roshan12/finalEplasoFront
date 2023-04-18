import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { AdminService } from '../../dashboard.service';

@Component({
    selector: 'app-notice-pop',
    templateUrl: './notice-pop.component.html',
    styleUrls: ['./notice-pop.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class EventPopupComponent implements OnInit {


    eventForm: FormGroup = new FormGroup({})
    profilePicModel: any = ''
    imageTemp:any
    imageEnvironmentUrl = environment.Main_Api + 'media/file/'
    galleryImageTemp:any

    constructor(private dialog: MatDialogRef<EventPopupComponent>, private service: AdminService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private fb: FormBuilder) { }
    updateBoolean: boolean = false
    buttonDisabled = false

    ngOnInit(): void {

        this.dialog.disableClose = true;
        console.log(this.data)
        if (this.data != null) {
            this.updateBoolean = true
        }
        this.eventForm = this.fb.group({
            _id: [this.data ? this.data._id : ''],
            description: [this.data ? this.data.description : '', Validators.required],
            name: [this.data ? this.data.name : '', Validators.required],
            imageGallery: this.fb.array([])
        })
        if(this.updateBoolean == true)
        {
            this.profilePicModel = environment.Main_Api + 'media/file/' + this.data.image
        }

        if(this.data != null)
        {
            for (let i = 0; i < this.data.imageGallery.length; i++) {
                this.ImageArray.push(this.fb.control(this.data.imageGallery[i]))
            }
        }
    }

    get ImageArray() {
        return this.eventForm.controls['imageGallery'] as FormArray;
    }

    clearGalleryImage(index: any) {
        this.ImageArray.removeAt(index)
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

    clear() {
        this.profilePicModel = ''
        this.imageTemp = null
    }


    submit() {
        console.log(this.eventForm.value);

        if (this.eventForm.invalid) return
        this.buttonDisabled = true

        this.service.createevent(this.eventForm.value).subscribe({
            next: (data: any) => {
                this.buttonDisabled = false
                // this.toastr.success(data.message)
                this.dialog.close('Success')
                this.ngOnInit()
            },
            error: (err: any) => {
                this.buttonDisabled = false
                console.log(err);
                // this.toastr.error(err.error.message)
            }
        })
    }

    close() {
        this.dialog.close()
    }

}
