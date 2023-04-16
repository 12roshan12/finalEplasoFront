import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../shared.service';
import { LandingService } from 'src/app/main/landing/landing.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  imageEnvironmentUrl = environment.Main_Api + 'media/file/'
  subscriptionForm: FormGroup = new FormGroup({})
  masterData:any
  constructor(
    private _route: Router,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private service: SharedService,
    private landingService:LandingService
  ) { }

  ngOnInit(): void {
    this.subscriptionForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required,Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]]
    })

    this.landingService.getMasterData('elpaso').subscribe({
      next: (data: any) => {
        this.masterData = data.data[0]
        console.log(this.masterData);

      },
      error: (err: any) => {
      }
    })

  }

  goto(link:any){
    if(link == "") return
    window.open(link, "_blank");
  }
  

  routeToProfile() {
    this._route.navigate(['/profile']);
  }

  submit() {
    if (this.subscriptionForm.invalid) {
      this.toastr.error('Invalid email or name')
      return
    }

    this.service.subscription(this.subscriptionForm.value).subscribe({
      next: (data: any) => {
        this.toastr.success(data.message)
        this.subscriptionForm.reset()
      },
      error: (err: any) => {
        this.toastr.error(err.error.message)
      }
    })

  }

}
