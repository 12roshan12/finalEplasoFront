import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { AdminService } from '../dashboard.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';


@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrls: ['./master-data.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MasterDataComponent implements OnInit {

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  services: any[] = ['Food', 'Hotels', 'Guide'];

  masterDataForm: FormGroup = new FormGroup({})
  imageEnvironmentUrl = environment.Main_Api + 'media/file/'
  logoTemp: any
  fetchedData: any;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private service: AdminService) { }

  ngOnInit() {

    this.buildFrom()

    this.service.getMasterData('elpaso').subscribe({
      next: (data: any) => {
        this.fetchedData = data.data[0]
        this.buildFrom(this.fetchedData)
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  buildFrom(data?: any) {
    this.masterDataForm = this.fb.group({
      _id: [data ? data._id : ''],
      agencyCode: [data ? data.agencyCode : 'elpaso'],
      name: [data ? data.name : '', Validators.required],
      logo: [data ? data.logo : '', Validators.required],
      footerBio: [data ? data.footerBio : '', Validators.required],
      bannerBio: [data ? data.bannerBio : '', Validators.required],
      bannerQuote: [data ? data.bannerQuote : '', Validators.required],
      bannerImage: [data ? data.bannerImage : '', Validators.required],
      aboutUsImage: [data ? data.aboutUsImage : '', Validators.required],
      aboutUsDescription: [data ? data.aboutUsDescription : '', Validators.required],
      services: new FormArray([]),
      facebookLink: [data ? data.facebookLink : '', Validators.required],
      instagramLink: [data ? data.instagramLink : '', Validators.required],
      youtubeLink: [data ? data.youtubeLink : '', Validators.required],
      address: [data ? data.address : '', Validators.required],
      email: [data ? data.email : '', Validators.required],
      contact: [data ? data.contact : '', Validators.required],
    })
    if (data) {
      this.services = data.services
    }


  }




  changeLogo(event: any) {
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
        this.masterDataForm.get('logo')?.setValue(res.path)
      })
    }
  }

  clearLogo() {
    this.masterDataForm.get('logo')?.setValue('')
    this.logoTemp = null
  }

  changeBannerImage(event: any) {
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
        this.masterDataForm.get('bannerImage')?.setValue(res.path)
      })
    }
  }

  clearBannerImage() {
    this.masterDataForm.get('bannerImage')?.setValue('')
    this.logoTemp = null
  }

  changeAboutUs(event: any) {
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
        this.masterDataForm.get('aboutUsImage')?.setValue(res.path)
      })
    }
  }

  clearAboutUs() {
    this.masterDataForm.get('aboutUsImage')?.setValue('')
    this.logoTemp = null
  }

  get ServiceArray() {
    return this.masterDataForm.controls['services'] as FormArray;
  }

  addService(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.services.push(value);
    }
    event.chipInput!.clear();
  }

  removeService(service: any): void {
    const index = this.services.indexOf(service);
    if (index >= 0) {
      this.services.splice(index, 1);
    }
  }

  editService(service: any, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.removeService(service);
      return;
    }
    const index = this.services.indexOf(service);
    if (index >= 0) {
      this.services[index] = value;
    }
  }

  submit() {
    if (this.masterDataForm.invalid) {
      this.toastr.error("Please fill all details")
      return
    }

    for (let i = 0; i < this.services.length; i++) {
      this.ServiceArray.push(this.fb.control(this.services[i]))
    }
    this.service.SubmitmasterDate(this.masterDataForm.value).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message)
        window.location.reload()
      },
      error: (err: any) => {
        this.toastr.error(err.error.message)
      }
    })
  }




}
