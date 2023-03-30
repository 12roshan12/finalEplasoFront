import { Component } from '@angular/core';
import { AdminService } from '../dashboard.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent {

  routeData = [
    {
      'name': 'Subscriber',
      'link': '/dashboard'
    }
  ]
  subscriberList:any = []

  constructor(private service:AdminService) { }

  ngOnInit(): void {
    this.service.getAllSubscriber().subscribe({
      next: (data: any) => {
        this.subscriberList = data.data
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }


  deleteGroup(id: any) {
    // this.GroupService.deleteGroup(id).subscribe({
    //   next: (data: any) => {
    //     console.log(data);
    //     this.toastr.success(data)
    //     this.ngOnInit()
    //   },
    //   error: (err: any) => {
    //     console.log(err);
    //     this.toastr.error(err.error.message)
    //   }
    // })
  }

  statusChanged(data: any,id:any) {
    // let formObject = <any>{}
    // formObject.status = data.target.checked
    // formObject.id = id
    // this.GroupService.changeGroupStatus(formObject).subscribe({
    //   next: (data: any) => {
    //     this.toastr.success(data)
    //     this.ngOnInit()
    //   },
    //   error: (err: any) => {
    //     this.toastr.error(err.error.message)
    //   }
    // })
  }

}
