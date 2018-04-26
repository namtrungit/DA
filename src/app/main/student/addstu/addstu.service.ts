import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { CONFIG } from '../../../core/app.config';
import { TokenService } from '../../../core/token.service';
@Injectable()
export class AddstuService {

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
  addStu(stu: Object) {
    return this._http.post(CONFIG.BASE_API + '/students/student', stu, { headers: this.createHeader() }).map(res => res.json());
  }
  tokenError() {
    this._tokenService.tokenError();
  }
  getClass() {
    return this._http.get(CONFIG.BASE_API + '/classes/class', { headers: this.createHeader() }).map(res => res.json());
  }
}
