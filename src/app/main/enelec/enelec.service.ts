import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TokenService } from '../../core/token.service';
import { CONFIG } from '../../core/app.config';

@Injectable()
export class EnelecService {

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
  getElec() {
    return this._http.get(CONFIG.BASE_API + '/elecs/elec-enable', { headers: this.createHeader() }).map(res => res.json());
  }
  findElec(month) {
    return this._http.post(CONFIG.BASE_API + '/elecs/find-elec-enable', month, { headers: this.createHeader() }).map(res => res.json());
  }
  tokenError() {
    return this._tokenService.tokenError();
  }
  updateElec(elec) {
    return this._http.put(CONFIG.BASE_API + '/elecs/update-elec', elec, { headers: this.createHeader() }).map(res => res.json());
  }
  checkDisable(elec) {
    return this._http.put(CONFIG.BASE_API + '/elecs/check-disable', elec, { headers: this.createHeader() }).map(res => res.json());
  }
  delElec(elec_id) {
    // tslint:disable-next-line:max-line-length
    return this._http.delete(CONFIG.BASE_API + '/elecs/del-elec?elec_id=' + elec_id, { headers: this.createHeader() }).map(res => res.json());
  }
  getRoom() {
    return this._http.get(CONFIG.BASE_API + '/rooms/room', { headers: this.createHeader() }).map(res => res.json());
  }
}
