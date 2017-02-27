import { Component, OnInit, HostBinding } from '@angular/core';
import { NasaService } from "../providers/nasa.service";
import * as moment from 'moment';
import { fadeOut } from "../animations";
import { DomSanitizer } from "@angular/platform-browser";
import { MdDialog, MdDialogRef } from "@angular/material";
import { ApodInfoModalComponent } from "../apod-info-modal/apod-info-modal.component";

type apod = {
  date?: Date,
  explanation?: string,
  hdurl?: string,
  title?: string,
  url?: string,
  copyright?: string
}

@Component({
  selector: 'app-apod-page',
  templateUrl: 'apod-page.component.html',
  styleUrls: ['apod-page.component.scss'],
  animations: [fadeOut]
})
export class APODPageComponent implements OnInit {

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
  subscriptions = { apod: null, apods: null };
  apodLoading: Boolean = true;
  @HostBinding('@routeAnimation') routeAnimation = true;

  constructor(private nasaService: NasaService,
    private sanitizer: DomSanitizer,
    public dialog: MdDialog) {
    this.months = moment.months().map((month, index) => {
      return { name: month, number: index };
    })
  }

  ngOnInit() {
    this.getApod();
  }

  getApod() {
    this.subscriptions.apod = this.nasaService.getAPOD().subscribe(
      (data) => {
        if (data.media_type === 'video') {
          data.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`${data.url.replace('autoplay=1', 'autoplay=0')}`);
        }
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
          if (data && data.media_type === 'video') {
            data.url = this.sanitizer.bypassSecurityTrustResourceUrl(`${data.url.replace('autoplay=1', 'autoplay=0')}`);
          }
          data.loading = true;
          tempApods.push(data);
          tempApods.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          });
        },
        (err) => console.log(err),
      );

      this.apods.push({ month: this.pickedDate.month, apods: tempApods });
      this.pickedApods = this.apods[this.apods.length - 1];
    }
  }

  viewAPOD(apod) {
    let dialogRef = this.dialog.open(ApodInfoModalComponent, {
      data: {
        apod: apod
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.apod ? this.subscriptions.apod.unsubscribe() : undefined;
    this.subscriptions.apods ? this.subscriptions.apods.unsubscribe() : undefined;
  }
}
