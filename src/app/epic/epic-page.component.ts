import {Component, OnInit, HostBinding} from '@angular/core';
import {fadeOut} from "../animations";
import {NasaService} from "../providers/nasa.service";
import * as moment from 'moment';
import {Http} from "@angular/http";
@Component({
  selector: 'app-epic-page',
  templateUrl: 'epic-page.component.html',
  styleUrls: ['epic-page.component.scss'],
  animations: [fadeOut]
})
export class EPICPageComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAniamtion: true;
  maxDate = moment().subtract(2, 'days').format('YYYY-MM-DD');
  params = {
    enhanced: false,
    date: this.maxDate
  };
  epics = [];
  epic;
  epicIndex = 0;
  autoplayImages: Boolean = false;
  autoplayImagesInterval;
  autoplayImagesSpeed = 1000;

  constructor(private nasaService: NasaService,
              private http: Http) {
  }

  ngOnInit() {
    this.getEPICS();
  }

  getEPICS() {
    this.autoplayImages = false;
    this.epicIndex = 0;
    this.epics = [];
    const tempEpics = [];
    this.nasaService.getEPIC(this.params).subscribe(
      (data) => data.map(epic => {
        tempEpics.push(epic)
      }),
      (err) => console.log(err),
      () => {
        this.epics = tempEpics;
        this.changeEpic();
      }
    )
  }

  changeEpic() {
    if (this.autoplayImages) {
      this.autoplayImagesInterval = setInterval(() => {
        this.checkIndex();
        this.epic = this.epics[this.epicIndex];
        this.epicIndex++;
        if (!this.autoplayImages)
          window.clearInterval(this.autoplayImagesInterval);
      }, this.autoplayImagesSpeed)
    } else {
      this.checkIndex();
      this.epic = this.epics[this.epicIndex];
    }

  }

  swipe(event) {
    this.autoplayImages = false;

    if (event.direction === 2)
      this.epicIndex++;

    if (event.direction === 4)
      this.epicIndex--;

    this.changeEpic();
  }

  checkIndex() {
    if (this.epicIndex < 0)
      this.epicIndex = this.epics.length - 1;

    if (this.epicIndex > this.epics.length - 1)
      this.epicIndex = 0;
  }

  updateAutoplay(clearInterval?) {
    if (clearInterval)
      window.clearInterval(this.autoplayImagesInterval);
    this.changeEpic();
  }

  selectEpic(epic) {
    let index = this.epics.findIndex(e => e.date === epic.date);
    this.autoplayImages = false;
    this.epicIndex = index;
    this.updateAutoplay(true);
  }
}
