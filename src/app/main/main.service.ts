import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { CONFIG } from '../core/app.config';
import { TokenService } from '../core/token.service';
import 'rxjs/add/operator/map';
@Injectable()
export class MainService {
  constructor(
    private _http: Http,
    private _tokenService: TokenService
  ) { }
  private createHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this._tokenService.getToken(CONFIG.TOKEN));
    return headers;
  }
  tokenError() {
    this._tokenService.tokenError();
  }
  getProfile() {
    return this._http.get(CONFIG.BASE_API + '/users/user', { headers: this.createHeaders() }).map(res => res.json());
  }
}
