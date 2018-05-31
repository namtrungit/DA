import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TokenService } from '../../../core/token.service';
import { CONFIG } from '../../../core/app.config';

@Injectable()
export class AddreportService {

  constructor(
    private _http: Http,
    private _tokenService: TokenService
  ) { }
  private createHeader() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this._tokenService.getToken(CONFIG.TOKEN));
    return headers;
  }
  getRule() {
    return this._http.get(CONFIG.BASE_API + '/rules/rule', { headers: this.createHeader() }).map(res => res.json());
  }
  tokenError() {
    return this._tokenService.tokenError();
  }
  getStu() {
    return this._http.get(CONFIG.BASE_API + '/students/list-id', { headers: this.createHeader() }).map(res => res.json());
  }
  getContent() {
    const lstRule = sessionStorage.getItem('gioluat');
    if (lstRule) {
      const dv = JSON.parse(lstRule);
      return dv;
    } else {
      return null;
    }
  }
  addReport(report) {
    return this._http.post(CONFIG.BASE_API + '/reports/report', report, { headers: this.createHeader() }).map(res => res.json());
  }
  addRd(rd) {
    return this._http.post(CONFIG.BASE_API + '/rds/rd', rd, { headers: this.createHeader() }).map(res => res.json());
  }
}
