import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { CONFIG } from '../../core/app.config';
import { TokenService } from '../../core/token.service';
import 'rxjs/add/operator/map';
@Injectable()
export class ProfileService {

  constructor(
    private _tokenService: TokenService,
    private _http: Http,
  ) { }
  private createHeader() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this._tokenService.getToken(CONFIG.TOKEN));
    return headers;
  }
  getProfile() {
    return this._http.get(CONFIG.BASE_API + '/users/user', { headers: this.createHeader() }).map(res => res.json());
  }
  updateProfile(data: Object) {
    return this._http.put(CONFIG.BASE_API + '/users/user', data, { headers: this.createHeader() }).map(res => res.json());
  }
  tokenError() {
    return this._tokenService.tokenError();
  }
}
