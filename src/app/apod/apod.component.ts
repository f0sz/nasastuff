import {Component, OnInit, trigger, state, style, transition, animate} from '@angular/core';
import {NasaService} from "../nasa.service";
import * as moment from 'moment';

type apod = {
  date?: Date,
  explanation?: string,
  hdurl?: string,
  title?: string,
  url?: string
}

@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('hidden', style({
        transform: 'translate3d(200%, 0, 0)'
      })),
      state('visible', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      transition('* => visible', animate('300ms ease-in')),
      transition('visible => hidden', animate('300ms ease-out'))
    ])
  ]
})
export class APODComponent implements OnInit {

  constructor(private nasaService: NasaService) {
  }

  apodState = 'hidden';
  apod: apod;
  apodDate: Date = new Date();
  today: Date = new Date();

  ngOnInit() {
    this.nasaService.getAPOD().subscribe(
      (data) => this.apod = data,
      (err) => console.log(err)
    )
  }

  getApod() {
    this.apodState = 'visible';
    let date = moment(this.apodDate).format('YYYY-MM-DD');
    this.nasaService.getAPOD(date).subscribe(
      (data) => {
        this.apod = data;
      },
      (err) => console.log(err)
    )
  }

}
