import { Component, ViewEncapsulation, OnInit } from "@angular/core"
import { MatDialog } from "@angular/material/dialog"
import { environment } from "src/environments/environment"
import { AdminService } from "../../dashboard/dashboard.service"
import { LandingService } from "../landing.service"
import { NoticePopComponent } from "./notice-pop/notice-pop.component"


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingPageComponent implements OnInit {

  noticeList: any[] = []
  categoryList: any[] = []
  blogList: any[] = []
  tripList: any[] = []
  teamList: any[] = []
  offerTripList: any[] = []
  normalTripList: any[] = []
  masterData: any
  imageEnvironmentUrl = environment.Main_Api + 'media/file/'
  constructor(private adminService: AdminService, private landingService: LandingService, private dialog: MatDialog) { }

  ngOnInit(): void {
    setTimeout(() => {
    }, 3000);

    this.landingService.getMasterData('elpaso').subscribe({
      next: (data: any) => {
        this.masterData = data.data[0]
        console.log(this.masterData);

      },
      error: (err: any) => {
      }
    })

    this.landingService.GetAllCategory().subscribe({
      next: (data: any) => {
        this.categoryList = data.data
        console.log(this.categoryList);

      },
      error: (err: any) => {
      }
    })

    this.landingService.getAllBlog().subscribe({
      next: (data: any) => {
        this.blogList = data.data
        this.blogList.sort((a, b) => b.updatedon.localeCompare(a.updatedon))
        this.blogList = this.blogList.splice(0, 3)

      },
      error: (err: any) => {
      }
    })

    this.landingService.getAllTeam().subscribe({
      next: (data: any) => {
        this.teamList = data.data
        this.teamList.sort((a, b) => b.updatedon.localeCompare(a.updatedon))
        this.teamList = this.teamList.splice(0, 3)

      },
      error: (err: any) => {
      }
    })

    this.landingService.getAllTrip().subscribe({
      next: (data: any) => {
        this.tripList = data.data
        this.offerTripList = data.data
        this.offerTripList = this.offerTripList.filter((e: any) => {
          return e.isSpecialOffer == true
        })
        this.offerTripList.sort((a, b) => b.updatedon.localeCompare(a.updatedon))
        this.offerTripList = this.offerTripList.splice(0, 8)
        this.normalTripList = data.data
        this.normalTripList = this.normalTripList.filter((e: any) => {
          return e.isSpecialOffer == false
        })
        this.normalTripList.sort((a, b) => b.updatedon.localeCompare(a.updatedon))
        this.normalTripList = this.normalTripList.splice(0, 8)

      },
      error: (err: any) => {
      }
    })

    this.adminService.GetAllnotice().subscribe({
      next: (data: any) => {
        this.noticeList = data.data
        if (sessionStorage.getItem('notice') != 'true') {
          for (let i = 0; i < this.noticeList.length; i++) {
            this.openNoticePop(this.noticeList[i])
          }
        }
      },
      error: (err: any) => {
      }
    })
  }

  calculateDiscount(basePrice: any, offerPrice: any) {
    let discount = ((basePrice - offerPrice) / basePrice) * 100
    return Math.round(discount)
  }

  goto(link:any){
    if(link == "") return
    window.open(link, "_blank");
  }

  openNoticePop(dat: any) {
    let dialogRef = this.dialog.open(NoticePopComponent, {
      width: '70vw',
      height: '70vh',
      data: dat
    })
    dialogRef.afterClosed().subscribe((data: any) => {
      sessionStorage.setItem('notice', 'true')
    })
  }

}
