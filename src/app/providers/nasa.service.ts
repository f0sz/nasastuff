import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from "@angular/http";
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class NasaService {

  private _API_KEY = 'rLCndMcc9esyIAdwpqsvqOHGPp47QKbZpH7SyKD9';
  private _URLS = {
    _APOD: 'https://api.nasa.gov/planetary/apod',
    _EPIC: {
      api: 'https://api.nasa.gov/EPIC/api',
      image: 'http://api.nasa.gov/EPIC/archive'
    }
  };

  private apods: Subject<any> = new Subject<any>();

  constructor(private http: Http) {
  }

  getAPOD(date?): Observable<any> {
    let params = new URLSearchParams();
    if (date)
      params.set('date', date);

    params.set('hd', 'true');
    params.set('api_key', this._API_KEY);

    return this.http.get(this._URLS._APOD, { search: params })
      .map((res: Response) => res.json())
      .catch((err: Response | any) => err)
  }

  getAPODS(pickedDate): Observable<any> {
    const date = `${pickedDate.year}-${pickedDate.month}`;
    const days = moment(date).daysInMonth();
    const params = new URLSearchParams();
    for (let i = 1; i <= days; i++) {
      let requestDate = i > 9 ? `${date}-${i.toString()}` : `${date}-0${i}`;
      if (requestDate <= moment().format('YYYY-MM-DD')) {
        this.getAPOD(requestDate).subscribe(
          (data) => this.apods.next(data),
          (err) => err
        )
      }
    }
    return this.apods.asObservable();
  }

  getEPIC(query): Observable<any> {
    let params = new URLSearchParams();
    let imageType = query.enhanced ? 'enhanced' : 'natural';
    let epicURL = `${this._URLS._EPIC.api}/${imageType}/date/${query.date}`;
    params.set('api_key', this._API_KEY);

    return this.http.get(epicURL, { search: params })
      .map((res: Response) =>
        res.json()
          .map((epic) => {
            let parsedDate = moment(epic.date).format('YYYY/MM/DD');
            epic.image_url = `${this._URLS._EPIC.image}/${imageType}/${parsedDate}/jpg/${epic.image}.jpg?api_key=${this._API_KEY}`;
            epic.image_url_hd = `${this._URLS._EPIC.image}/${imageType}/${parsedDate}/png/${epic.image}.png?api_key=${this._API_KEY}`;
            epic.image_thumb = `${this._URLS._EPIC.image}/${imageType}/${parsedDate}/thumbs/${epic.image}.jpg?api_key=${this._API_KEY}`;
            return epic;
          })
      )
      .catch((err: Response | any) => err)
  }

  getMaxDate(): Observable<any> {
    let params = new URLSearchParams();
    let datesURL = `${this._URLS._EPIC.api}/natural/available`;
    params.set('api_key', this._API_KEY);
    return this.http.get(datesURL, { search: params })
      .map((res: Response) => {
        let arr = res.json();
        return arr[arr.length - 1];
      })
      .catch((err: Response | any) => err)
  }

}
