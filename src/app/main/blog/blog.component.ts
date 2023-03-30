import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogList:any
  imageEnvironmentUrl = environment.Main_Api+'media/file/'

  constructor(private service: SharedService) { }

  ngOnInit() {
    this.service.getAllBlog().subscribe({
      next: (data: any) => {
        this.blogList = data.data
      },
      error: (err: any) => {
      }
    })
  }

}
