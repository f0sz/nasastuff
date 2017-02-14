import {Component, OnInit, HostBinding} from '@angular/core';
import {fadeOut} from "../animations";
import {NasaService} from "../providers/nasa.service";
import * as moment from 'moment';
@Component({
  selector: 'app-epic',
  templateUrl: './epic.component.html',
  styleUrls: ['./epic.component.scss'],
  animations: [fadeOut]
})
export class EPICComponent implements OnInit {

  @HostBinding('@routeAnimation') routeAniamtion: true;

  query = {
    date: new Date(),
    type: 'natural'
  };
  today: Date = new Date();
  epic;

  constructor(private nasaService: NasaService) {
  }

  ngOnInit() {
    let query = {
      date: moment(this.query.date).format('YYYY-MM-DD'),
      type: this.query.type
    };
    this.nasaService.getEPIC(query).subscribe(
      (data) => console.log(data),
      (err) => console.log(err)
    )
  }

  changeType(event) {
    this.query.type = event.target.checked ? 'enchanced' : 'normal';
  }

}
