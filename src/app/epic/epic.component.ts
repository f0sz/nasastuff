import {Component, OnInit, HostBinding} from '@angular/core';
import {fadeOut} from "../animations";
import {NasaService} from "../providers/nasa.service";
import * as moment from 'moment';
import {Observable} from "rxjs";
@Component({
  selector: 'app-epic',
  templateUrl: './epic.component.html',
  styleUrls: ['./epic.component.scss'],
  animations: [fadeOut]
})
export class EPICComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAniamtion: true;
  maxDate = moment().subtract(2, 'days').format('YYYY-MM-DD');
  params = {
    enhanced: false,
    date: this.maxDate
  };
  epics = [];
  epic;
  changeInterval;


  constructor(private nasaService: NasaService) {
  }

  ngOnInit() {
    this.getEPICS();
  }

  getEPICS() {
    window.clearInterval(this.changeInterval);
    const tempEpics = [];
    this.nasaService.getEPIC(this.params).subscribe(
      (data) => data.map(epic => tempEpics.push(epic)),
      (err) => console.log(err),
      () => {
        this.epics = tempEpics;
        this.epic = this.epics[0];
        this.changeEpic();
      }
    )
  }

  changeEpic() {
    let index = 0;
    this.changeInterval = setInterval(() => {
      if (index >= this.epics.length) index = 0;

      this.epic = this.epics[index];
      index++;
    }, 500);
  }

}
