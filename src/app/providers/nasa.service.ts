import {Injectable} from '@angular/core';
import {Http, URLSearchParams, Response} from "@angular/http";
import * as moment from 'moment';
import {Observable, Subject, BehaviorSubject} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class NasaService {

  private _API_URL = 'https://api.nasa.gov/planetary';
  private _APOD_URL = `${this._API_URL}/apod`;
  private _EPIC_URL = `https://api.nasa.gov/EPIC/api/`;
  private _API_KEY = 'rLCndMcc9esyIAdwpqsvqOHGPp47QKbZpH7SyKD9';

  private apods: Subject<any> = new Subject<any>();

  constructor(private http: Http) {
  }

  getAPOD(date?): Observable<any> {
    let params = new URLSearchParams();
    if (date)
      params.set('date', date);

    params.set('hd', 'true');
    params.set('api_key', this._API_KEY);

    return this.http.get(this._APOD_URL, {search: params})
      .map((res: Response) => res.json())
      .catch((err: Response|any) => err)

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
          (err) => console.log(err)
        )
      }
    }
    return this.apods.asObservable();
  }

  getEPIC(query?): Observable<any> {
    let params = new URLSearchParams();

    params.set(`${query.type}/date`, query.date);
    params.set('api_key', this._API_KEY);

    return this.http.get(this._EPIC_URL, {search: params})
      .map((res: Response) => res.json())
      .catch((err: Response |any) => err)

  }


}
