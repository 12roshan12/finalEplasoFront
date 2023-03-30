import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isLoggedIn = sessionStorage.getItem('token')
  role = sessionStorage.getItem('role')

  constructor(private router:Router,private tosatr:ToastrService) { }

  ngOnInit(): void {
    if(this.isLoggedIn != '' && this.role !='admin' ){
      this.tosatr.error('Not Authorized')
      this.router.navigateByUrl('/')
    }

    if(this.isLoggedIn == ''){
      this.tosatr.error('Please login to continue')
      this.router.navigateByUrl('/login')
    }
  }

}
