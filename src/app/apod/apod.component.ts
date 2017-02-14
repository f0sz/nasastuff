import {Component, OnInit, HostBinding} from '@angular/core';
import {NasaService} from "../providers/nasa.service";
import * as moment from 'moment';
import {fadeOut} from "../animations";
import {DomSanitizer} from "@angular/platform-browser";

type apod = {
  date?: Date,
  explanation?: string,
  hdurl?: string,
  title?: string,
  url?: string,
  copyright?: string
}

@Component({
  selector: 'app-apod',
  templateUrl: './apod.component.html',
  styleUrls: ['./apod.component.scss'],
  animations: [fadeOut]
})
export class APODComponent implements OnInit {

  constructor(private nasaService: NasaService, private sanitizer: DomSanitizer) {
    this.months = moment.months().map((month, index) => {
      return {name: month, number: index};
    })
  }

  apod: apod;
  maxYear = moment().format('YYYY');
  maxMonth = moment().format('MM');
  months: Array<Object>;
  pickedDate = {
    month: moment().format('MM') + 1,
    year: moment().format('YYYY')
  };
  apods = [];
  pickedApods = [];
  subscriptions = {apod: null, apods: null};

  @HostBinding('@routeAnimation') routeAnimation = true;

  ngOnInit() {
    this.getApod();
  }

  getApod() {
    this.subscriptions.apod = this.nasaService.getAPOD(moment().format('YYYY-MM-DD')).subscribe(
      (data) => {
        this.apod = data;
      },
      (err) => console.log(err)
    )
  }

  getApods() {
    this.pickedDate.month = moment().month(this.pickedDate.month).format('MM');
    const index = this.apods.findIndex(month => month === this.pickedDate.month)
    const tempApods = [];
    if (index > -1) {
      this.pickedApods = this.apods[index]
    } else {
      this.subscriptions.apods = this.nasaService.getAPODS(this.pickedDate).subscribe(
        (data) => {
          if (data.media_type === 'video') {
            data.url = this.sanitizer.bypassSecurityTrustResourceUrl(`${data.url.replace('autoplay=1', 'autoplay=0')}`);
          }
          tempApods.push(data);
        },
        (err) => console.log(err)
      );
      this.apods.push({month: this.pickedDate.month, apods: tempApods});
      this.pickedApods = this.apods[this.apods.length - 1];
    }
  }

  ngOnDestroy() {
    this.subscriptions.apod.unsubscribe();
    this.subscriptions.apods.unsubscribe();
  }
}
