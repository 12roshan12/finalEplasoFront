import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoaderService } from 'src/app/main/authenticate/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class LoaderComponent implements OnInit {
  loaderBool = true
  constructor(public loader: LoaderService) { }

  ngOnInit(): void {
    
  }

}
