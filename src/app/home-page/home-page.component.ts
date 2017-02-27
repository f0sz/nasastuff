import { Component, OnInit, HostBinding } from '@angular/core';
import { fadeOut } from "../animations";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  animations: [fadeOut]
})
export class HomePageComponent implements OnInit {


  @HostBinding('@routeAnimation') routeAnimation = true;

  constructor() {
  }

  ngOnInit() {
  }

}
