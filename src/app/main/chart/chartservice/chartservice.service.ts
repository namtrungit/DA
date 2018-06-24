import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TokenService } from '../../../core/token.service';
import { CONFIG } from '../../../core/app.config';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class ChartserviceService {

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
  tokenError() {
    return this._tokenService.tokenError();
  }
  getChartService(year) {
    return this._http.get(CONFIG.BASE_API + '/bills/chart-bill?year=' + year, { headers: this.createHeader() }).map(res => res.json());
  }
  getChartContract(year) {
    // tslint:disable-next-line:max-line-length
    return this._http.get(CONFIG.BASE_API + '/contracts/chart-contract?year=' + year, { headers: this.createHeader() }).map(res => res.json());
  }
  getChartReport(year) {
    return this._http.get(CONFIG.BASE_API + '/reports/chart-report?year=' + year, { headers: this.createHeader() }).map(res => res.json());
  }
  getQuantityArea() {
    return this._http.get(CONFIG.BASE_API + '/areas/quantity-area', { headers: this.createHeader() }).map(res => res.json());
  }
  getCurrentContract() {
    return this._http.get(CONFIG.BASE_API + '/contracts/current-contract', { headers: this.createHeader() }).map(res => res.json());
  }
  getQuantityRoom() {
    return this._http.get(CONFIG.BASE_API + '/rooms/quantity-room', { headers: this.createHeader() }).map(res => res.json());
  }
  getEmptyRoom() {
    return this._http.get(CONFIG.BASE_API + '/rooms/empty-room-quantity', { headers: this.createHeader() }).map(res => res.json());
  }
}
