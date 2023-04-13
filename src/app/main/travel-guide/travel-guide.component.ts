import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-travel-guide',
  templateUrl: './travel-guide.component.html',
  styleUrls: ['./travel-guide.component.scss']
})
export class TravelGuideComponent {

  blogList: any
  imageEnvironmentUrl = environment.Main_Api + 'media/file/'

  constructor(private service: SharedService) { }

  ngOnInit() {
    this.service.getAllBlog().subscribe({
      next: (data: any) => {
        this.blogList = data.data
        this.blogList = this.blogList.filter((data: any) => {
          if (data.isGuidline == true) return data
        })
      },
      error: (err: any) => {
      }
    })
  }

}
