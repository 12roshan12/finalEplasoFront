import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { AdminService } from '../../dashboard.service';

@Component({
    selector: 'app-category-pop',
    templateUrl: './category-pop.component.html',
    styleUrls: ['./category-pop.component.scss'],
    encapsulation: ViewEncapsulation.None

})
export class CategoryPopupComponent implements OnInit {

    @ViewChild('profileUpload') profileUpload: any

    categoryForm: FormGroup = new FormGroup({})
    profilePicModel: any = ''
    imageTemp:any

    constructor(private dialog: MatDialogRef<CategoryPopupComponent>, private service: AdminService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        // private toastr:toastrse
        private fb: FormBuilder) { }
    updateBoolean: boolean = false
    buttonDisabled = false

    ngOnInit(): void {
        console.log(this.profileUpload);

        this.dialog.disableClose = true;
        console.log(this.data)
        if (this.data != null) {
            this.updateBoolean = true
        }
        this.categoryForm = this.fb.group({
            _id: [this.data ? this.data._id : ''],
            slogan: [this.data ? this.data.slogan : '', Validators.required],
            name: [this.data ? this.data.name : '', Validators.required],
            image: [this.data ? this.data.image : '', Validators.required]
        })
        if(this.updateBoolean == true)
        {
            this.profilePicModel = environment.Main_Api + 'media/file/' + this.data.image
        }
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
                this.categoryForm.get('image')?.setValue(res.path)
            })
        }
    }

    clear() {
        this.profilePicModel = ''
        this.imageTemp = null
    }


    submit() {
        console.log(this.categoryForm.value);

        if (this.categoryForm.invalid) return
        this.buttonDisabled = true

        this.service.createCategory(this.categoryForm.value).subscribe({
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
