import { Injectable } from '@angular/core';
import { CONFIG } from '../../core/app.config';
import { TokenService } from '../../core/token.service';
import { Http, Headers } from '@angular/http';
@Injectable()
export class AreaService {

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
  getArea() {
    return this._http.get(CONFIG.BASE_API + '/areas/area', { headers: this.createHeader() }).map(res => res.json());
  }
  tokenError() {
    return this._tokenService.tokenError();
  }
  delArea(area_id) {
    // tslint:disable-next-line:max-line-length
    return this._http.delete(CONFIG.BASE_API + '/areas/del-area?area_id=' + area_id, { headers: this.createHeader() }).map(res => res.json());
  }
  addArea(area) {
    return this._http.post(CONFIG.BASE_API + '/areas/area', area, { headers: this.createHeader() }).map(res => res.json());
  }
  updateArea(area) {
    return this._http.put(CONFIG.BASE_API + '/areas/update-area', area, { headers: this.createHeader() }).map(res => res.json());
  }
  getFloor() {
    return this._http.get(CONFIG.BASE_API + '/floors/floor', { headers: this.createHeader() }).map(res => res.json());
  }
  getAfdById(area_id) {
    // tslint:disable-next-line:max-line-length
    return this._http.get(CONFIG.BASE_API + '/afds/afdByAreaId?af_area_id=' + area_id, { headers: this.createHeader() }).map(res => res.json());
  }
  addAfd(afd) {
    return this._http.post(CONFIG.BASE_API + '/afds/afd', afd, { headers: this.createHeader() }).map(res => res.json());
  }
  delAfd(af_id) {
    return this._http.delete(CONFIG.BASE_API + '/afds/del-afd?af_id=' + af_id, { headers: this.createHeader() }).map(res => res.json());
  }
}
