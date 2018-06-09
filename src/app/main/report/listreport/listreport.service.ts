import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TokenService } from '../../../core/token.service';
import { CONFIG } from '../../../core/app.config';

@Injectable()
export class ListreportService {

  constructor(
    private _http: Http,
    private _tokenService: TokenService
  ) { }
  private createHeader() {
    const headers = new Headers();
    headers.append('Content-Type', 'Application/json');
    headers.append('token', this._tokenService.getToken(CONFIG.TOKEN));
    return headers;
  }
  tokenError() {
    return this._tokenService.tokenError();
  }
  getReport() {
    return this._http.get(CONFIG.BASE_API + '/reports/report', { headers: this.createHeader() }).map(res => res.json());
  }
  getRule() {
    return this._http.get(CONFIG.BASE_API + '/rules/rule', { headers: this.createHeader() }).map(res => res.json());
  }
  getStu() {
    return this._http.get(CONFIG.BASE_API + '/students/list-id', { headers: this.createHeader() }).map(res => res.json());
  }
  getRd(report_id) {
    // tslint:disable-next-line:max-line-length
    return this._http.get(CONFIG.BASE_API + '/rds/list-rd?rd_report_id=' + report_id, { headers: this.createHeader() }).map(res => res.json());
  }
  delReport(report_id) {
    // tslint:disable-next-line:max-line-length
    return this._http.delete(CONFIG.BASE_API + '/reports/del-report?report_id=' + report_id, { headers: this.createHeader() }).map(res => res.json());
  }
  delRd(rd_id) {
    return this._http.delete(CONFIG.BASE_API + '/rds/del-rd?rd_id=' + rd_id, { headers: this.createHeader() }).map(res => res.json());
  }
  addRd(rd) {
    return this._http.post(CONFIG.BASE_API + '/rds/rd', rd, { headers: this.createHeader() }).map(res => res.json());
  }
  updateReport(report) {
    return this._http.put(CONFIG.BASE_API + '/reports/update-report', report, { headers: this.createHeader() }).map(res => res.json());
  }
  findReport(report) {
    return this._http.post(CONFIG.BASE_API + '/reports/find-report', report, { headers: this.createHeader() }).map(res => res.json());
  }
}
