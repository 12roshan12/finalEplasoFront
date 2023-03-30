import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-preview',
  templateUrl: './blog-preview.component.html',
  styleUrls: ['./blog-preview.component.scss']
})
export class BlogPreviewComponent implements OnInit {

  BlogDetail :any
  imageEnvironmentUrl = environment.Main_Api+'media/file/'

  constructor(private route:ActivatedRoute,private service:SharedService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params:any)=>{
      console.log(params);
      
      this.service.getAllBlogById(params.params.id).subscribe({
        next:(data:any)=>{
            this.BlogDetail = data.data[0]
        },
        error:(err:any)=>{
        }
      })
    })
  }

}
