import { Component, OnInit } from '@angular/core';
import { AdminService } from '../dashboard.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  showImageGallery = false
  eventList: any[] = []
  slides:any[] = [];
  slideConfig = { slidesToShow: 1, slidesToScroll: 1 };
  imageEnvironmentUrl = environment.Main_Api + 'media/file/'
  constructor(private service: AdminService) { }

  ngOnInit(): void {
    this.service.GetAllevent().subscribe({
      next: (data: any) => {
        this.eventList = data.data
      },
      error: (err: any) => {
      }
    })
  }

  closeCrousel() {
    this.showImageGallery = false
  }

  openSlider(data:any){
    this.slides = data
    this.showImageGallery = true
  }

}
