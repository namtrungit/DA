import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TokenService } from '../../core/token.service';
import { CONFIG } from '../../core/app.config';
@Injectable()
export class FloorService {

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
  getFloor() {
    return this._http.get(CONFIG.BASE_API + '/floors/floor', { headers: this.createHeader() }).map(res => res.json());
  }
  tokenError() {
    return this._tokenService.tokenError();
  }
  addFloor(floor) {
    return this._http.post(CONFIG.BASE_API + '/floors/floor', floor, { headers: this.createHeader() }).map(res => res.json());
  }
  delFloor(floor_id) {
    // tslint:disable-next-line:max-line-length
    return this._http.delete(CONFIG.BASE_API + '/floors/del-floor?floor_id=' + floor_id, { headers: this.createHeader() }).map(res => res.json());
  }
}
