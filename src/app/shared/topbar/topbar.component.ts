import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/main/profile/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  isAuthorized = sessionStorage.getItem('token')
  role = sessionStorage.getItem('role')
  userDetails:any
  imageEnvironmentUrl = environment.Main_Api + 'media/file/'
  

  constructor(
   private _route: Router,
   private service:ProfileService
  ) { }

  ngOnInit(): void {

    if(this.isAuthorized){
      this.service.getUserDetails(sessionStorage.getItem('userId')).subscribe({
        next: (res: any) => {
          this.userDetails = res.data
        },
        error: (err: any) => {
        }
      })
    }
  }
  routeToProfile(){
    this._route.navigate(['/profile']);
  }

}
