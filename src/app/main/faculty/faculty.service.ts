import { Injectable } from '@angular/core';
import { CONFIG } from '../../core/app.config';
import { TokenService } from '../../core/token.service';
import { Http, Headers } from '@angular/http';
@Injectable()
export class FacultyService {

  constructor(
    private _tokenService: TokenService,
    private _http: Http
  ) { }
  private createHeader() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this._tokenService.getToken(CONFIG.TOKEN));
    return headers;
  }
  getFaculty() {
    return this._http.get(CONFIG.BASE_API + '/faculties/faculty', { headers: this.createHeader() }).map(res => res.json());
  }
  addFaculty(fal: Object) {
    return this._http.post(CONFIG.BASE_API + '/faculties/faculty', fal, { headers: this.createHeader() }).map(res => res.json());
  }
  tokenError() {
    this._tokenService.tokenError();
  }
  delFaculty(fal_id) {
    // tslint:disable-next-line:max-line-length
    return this._http.delete(CONFIG.BASE_API + '/faculties/del-faculty?fal_id=' + fal_id, {headers: this.createHeader()}).map(res => res.json());
  }
}
