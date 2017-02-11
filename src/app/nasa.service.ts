import {Injectable} from '@angular/core';
import {Http, URLSearchParams, Response} from "@angular/http";
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class NasaService {

  private _API_URL = 'https://api.nasa.gov/planetary';
  private _APOD_URL = `${this._API_URL}/apod`;
  private _API_KEY = 'rLCndMcc9esyIAdwpqsvqOHGPp47QKbZpH7SyKD9';

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

}
