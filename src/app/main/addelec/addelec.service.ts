import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TokenService } from '../../core/token.service';
import { CONFIG } from '../../core/app.config';

@Injectable()
export class AddelecService {

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
  getRoom() {
    return this._http.get(CONFIG.BASE_API + '/rooms/room', { headers: this.createHeader() }).map(res => res.json());
  }
  getCreater() {
    return this._http.get(CONFIG.BASE_API + '/users/user', { headers: this.createHeader() }).map(res => res.json());
  }
  tokenError() {
    return this._tokenService.tokenError();
  }
  addElec(elec) {
    return this._http.post(CONFIG.BASE_API + '/elecs/elec', elec, { headers: this.createHeader() }).map(res => res.json());
  }
}
