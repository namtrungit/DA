import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TokenService } from '../../core/token.service';
import { CONFIG } from '../../core/app.config';

@Injectable()
export class OldcontractService {

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
  getContract() {
    return this._http.get(CONFIG.BASE_API + '/contracts/list-contract-old', { headers: this.createHeader() }).map(res => res.json());
  }
  tokenError() {
    return this._tokenService.tokenError();
  }
  searchContract(contract) {
    // tslint:disable-next-line:max-line-length
    return this._http.post(CONFIG.BASE_API + '/contracts/find-contract-old', contract, { headers: this.createHeader() }).map(res => res.json());
  }
  delContract(contract_id) {
    // tslint:disable-next-line:max-line-length
    return this._http.delete(CONFIG.BASE_API + '/contracts/del-contract?contract_id=' + contract_id, { headers: this.createHeader() }).map(res => res.json());
  }
  getProfile() {
    return this._http.get(CONFIG.BASE_API + '/users/user', { headers: this.createHeader() }).map(res => res.json());
  }
}
