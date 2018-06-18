import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { CONFIG } from '../../core/app.config';

@Injectable()
export class DetailService {

  constructor(
    private _http: Http,
  ) { }
  private createHeader() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  getNewsById(id) {
    return this._http.get(CONFIG.BASE_API + '/news/get-news?id=' + id, { headers: this.createHeader() }).map(res => res.json());
  }
}
