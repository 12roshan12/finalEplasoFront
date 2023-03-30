import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './breadCrumb.component.html'
})
export class BreadCrumbComponent implements OnInit {

   @Input() public routeData:any;

  constructor() { 
  }

  ngOnInit(): void {
  }

}
