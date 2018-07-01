import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TokenService } from '../../core/token.service';
import { CONFIG } from '../../core/app.config';
import { ReturnStatement } from '@angular/compiler';

@Injectable()
export class UserService {
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
  getUser() {
    return this._http.get(CONFIG.BASE_API + '/users/list-user', { headers: this.createHeader() }).map(res => res.json());
  }
  tokenError() {
    return this._tokenService.tokenError();
  }
  addUser(user) {
    return this._http.post(CONFIG.BASE_API + '/users/user', user, { headers: this.createHeader() }).map(res => res.json());
  }
  delUser(user_id) {
    return this._http.delete(CONFIG.BASE_API + '/users/user?user_id=' + user_id, { headers: this.createHeader() }).map(res => res.json());
  }
  updateUser(user) {
    return this._http.put(CONFIG.BASE_API + '/users/user-update-position', user, { headers: this.createHeader() }).map(res => res.json());
  }
}
