import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TokenService } from '../../../core/token.service';
import { CONFIG } from '../../../core/app.config';

@Injectable()
export class ReenableService {

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
  getEnable() {
    return this._http.get(CONFIG.BASE_API + '/registers/list-enable', { headers: this.createHeader() }).map(res => res.json());
  }
  delRegister(register_id) {
    // tslint:disable-next-line:max-line-length
    return this._http.delete(CONFIG.BASE_API + '/registers/del-register?register_id=' + register_id, { headers: this.createHeader() }).map(res => res.json());
  }
  checkRegister(register) {
    // tslint:disable-next-line:max-line-length
    return this._http.put(CONFIG.BASE_API + '/registers/disable-register', register, { headers: this.createHeader() }).map(res => res.json());
  }
}
