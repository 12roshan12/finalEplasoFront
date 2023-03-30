import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

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
  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.full = !this.full;
  }

  clicked() {
    console.log('clicked');
  }

}
