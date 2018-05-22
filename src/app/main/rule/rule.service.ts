import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TokenService } from '../../core/token.service';
import { CONFIG } from '../../core/app.config';

@Injectable()
export class RuleService {

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
  addRule(rule) {
    return this._http.post(CONFIG.BASE_API + '/rules/rule', rule, { headers: this.createHeader() }).map(res => res.json());
  }
  getRule() {
    return this._http.get(CONFIG.BASE_API + '/rules/rule', { headers: this.createHeader() }).map(res => res.json());
  }
  tokenError() {
    return this._tokenService.tokenError();
  }
  delRule(rule_id) {
    // tslint:disable-next-line:max-line-length
    return this._http.delete(CONFIG.BASE_API + '/rules/del-rule?rule_id=' + rule_id, { headers: this.createHeader() }).map(res => res.json());
  }
  updateRule(rule) {
    return this._http.put(CONFIG.BASE_API + '/rules/update-rule', rule, { headers: this.createHeader() }).map(res => res.json());
  }
}
