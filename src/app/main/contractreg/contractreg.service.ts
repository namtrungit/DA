import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TokenService } from '../../core/token.service';
import { CONFIG } from '../../core/app.config';
@Injectable()
export class ContractregService {

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
  getRec() {
    return this._http.get(CONFIG.BASE_API + '/recs/rec', { headers: this.createHeader() }).map(res => res.json());
  }
  addRec(recontract) {
    return this._http.post(CONFIG.BASE_API + '/recs/rec', recontract, { headers: this.createHeader() }).map(res => res.json());
  }
  delRec(recontract_id) {
    // tslint:disable-next-line:max-line-length
    return this._http.delete(CONFIG.BASE_API + '/recs/del-rec?recontract_id=' + recontract_id, { headers: this.createHeader() }).map(res => res.json());
  }
  updateRec(recontract) {
    return this._http.put(CONFIG.BASE_API + '/recs/update-rec', recontract, { headers: this.createHeader() }).map(res => res.json());
  }
}
