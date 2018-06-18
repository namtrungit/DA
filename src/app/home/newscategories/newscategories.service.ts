import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { CONFIG } from '../../core/app.config';

@Injectable()
export class NewscategoriesService {

  constructor(
    private _http: Http
  ) { }
  createHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  getNews() {
    return this._http.get(CONFIG.BASE_API + '/news/list-news', { headers: this.createHeaders() }).map(res => res.json());
  }
}