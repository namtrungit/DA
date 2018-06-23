import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TokenService } from '../../core/token.service';
import { CONFIG } from '../../core/app.config';

@Injectable()
export class ElecService {

  constructor(
    private _http: Http,
  ) { }
  private createHeader() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  getArea() {
    return this._http.get(CONFIG.BASE_API + '/areas/area', { headers: this.createHeader() }).map(res => res.json());
  }
  postArea(area) {
    return this._http.post(CONFIG.BASE_API + '/elecs/list-elec', area, { headers: this.createHeader() }).map(res => res.json());
  }
}
