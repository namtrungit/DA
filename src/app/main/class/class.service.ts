import { Injectable } from '@angular/core';
import { CONFIG } from '../../core/app.config';
import { TokenService } from '../../core/token.service';
import { Http, Headers } from '@angular/http';
@Injectable()
export class ClassService {

  constructor(
    private _http: Http,
    private _tokenService: TokenService
  ) { }
  private createHeader() {
    const headers = new Headers;
    headers.append('Content-Type', 'application/json');
    headers.append('token', this._tokenService.getToken(CONFIG.TOKEN));
    return headers;
  }
  tokenError() {
    return this._tokenService.tokenError();
  }
  getClass() {
    return this._http.get(CONFIG.BASE_API + '/classes/class', { headers: this.createHeader() }).map(res => res.json());
  }
  addClass(cla) {
    return this._http.post(CONFIG.BASE_API + '/classes/class', cla, { headers: this.createHeader() }).map(res => res.json());
  }
  getFaculty() {
    return this._http.get(CONFIG.BASE_API + '/faculties/faculty', { headers: this.createHeader() }).map(res => res.json());
  }
  delClass(class_id) {
    // tslint:disable-next-line:max-line-length
    return this._http.delete(CONFIG.BASE_API + '/classes/del-class?class_id=' + class_id, { headers: this.createHeader() }).map(res => res.json());
  }
  updateClass(cla) {
    return this._http.put(CONFIG.BASE_API + '/classes/update-class', cla, { headers: this.createHeader() }).map(res => res.json());
  }
}
