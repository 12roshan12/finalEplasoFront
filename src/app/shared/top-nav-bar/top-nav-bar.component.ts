import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/main/profile/profile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-top-nav-bar',
  templateUrl: './top-nav-bar.component.html',
  styleUrls: ['./top-nav-bar.component.scss']
})
export class TopNavBarComponent implements OnInit {
  @Output('goToLoginPage') goToLoginPage: EventEmitter<any> = new EventEmitter();

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

  goToLogin() {
    this._route.navigate(['/login']);
    this.goToLoginPage.emit(true);
  }
  signout(){
    sessionStorage.clear()
    localStorage.clear()
    window.location.reload()
    this._route.navigate(['home']);

  }

}
