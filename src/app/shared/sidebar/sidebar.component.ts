import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { environment } from 'src/environments/environment';
import { LandingService } from 'src/app/main/landing/landing.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            // style({ height: 0, opacity: 0 }),
            animate('0.6s ease-out')
          ]
        ),
        transition(
          ':leave',
          [
            // style({ height: 50, opacity: 1 }),
            animate('0.3s ease-in')
          ]
        )
      ]
    )
  ]
})
export class SidebarComponent implements OnInit {
  full: boolean = true;
  imageEnvironmentUrl = environment.Main_Api + 'media/file/'
  masterData:any
  constructor(private landingService:LandingService) { }

  ngOnInit(): void {

    this.landingService.getMasterData('elpaso').subscribe({
      next: (data: any) => {
        this.masterData = data.data[0]
        console.log(this.masterData);

      },
      error: (err: any) => {
      }
    })
  }
  

  toggleSidebar() {
    this.full = !this.full;
  }

  clicked() {
    console.log('clicked');
  }

}
