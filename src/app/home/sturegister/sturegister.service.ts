import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { CONFIG } from '../../core/app.config';
@Injectable()
export class SturegisterService {

  constructor(
    private _http: Http
  ) { }
  private createHeader() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  addRegister(register) {
    return this._http.post(CONFIG.BASE_API + '/registers/register', register, { headers: this.createHeader() }).map(res => res.json());
  }
}
