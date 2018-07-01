import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TokenService } from '../../core/token.service';
import { CONFIG } from '../../core/app.config';

@Injectable()
export class DiselecService {

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
    return this._http.get(CONFIG.BASE_API + '/elecs/elec-disable', { headers: this.createHeader() }).map(res => res.json());
  }
  tokenError() {
    return this._tokenService.tokenError();
  }
  checkEnable(elec) {
    return this._http.put(CONFIG.BASE_API + '/elecs/check-enable', elec, { headers: this.createHeader() }).map(res => res.json());
  }
  findElec(month) {
    return this._http.post(CONFIG.BASE_API + '/elecs/find-elec-disable', month, { headers: this.createHeader() }).map(res => res.json());
  }
  delElec(elec_id) {
    // tslint:disable-next-line:max-line-length
    return this._http.delete(CONFIG.BASE_API + '/elecs/del-elec?elec_id=' + elec_id, { headers: this.createHeader() }).map(res => res.json());
  }
  getRoom() {
    return this._http.get(CONFIG.BASE_API + '/rooms/room', { headers: this.createHeader() }).map(res => res.json());
  }
  getProfile() {
    return this._http.get(CONFIG.BASE_API + '/users/user', { headers: this.createHeader() }).map(res => res.json());
  }
}
