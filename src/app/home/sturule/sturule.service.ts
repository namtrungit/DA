import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TokenService } from '../../core/token.service';
import { CONFIG } from '../../core/app.config';

@Injectable()
export class SturuleService {

  constructor(
    private _http: Http,
    private _tokenService: TokenService
  ) { }
  private createHeader() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // headers.append('token', this._tokenService.getToken(CONFIG.TOKEN));
    return headers;
  }
  getRule() {
    return this._http.get(CONFIG.BASE_API + '/rules/rule', { headers: this.createHeader() }).map(res => res.json());
  }
}
