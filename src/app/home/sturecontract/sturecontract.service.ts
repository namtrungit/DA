import { Injectable } from '@angular/core';
import { CONFIG } from '../../core/app.config';
import { Http, Headers } from '@angular/http';
@Injectable()
export class SturecontractService {

  constructor(
    private _http: Http,
  ) { }
  private createHeader() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  getRec() {
    return this._http.get(CONFIG.BASE_API + '/recs/rec-enable', { headers: this.createHeader() }).map(res => res.json());
  }
}
