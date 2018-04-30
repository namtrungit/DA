import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TokenService } from '../../core/token.service';
import { CONFIG } from '../../core/app.config';
import 'rxjs/add/operator/map';
@Injectable()
export class ContractService {

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
    return this._http.get(CONFIG.BASE_API + '/contracts/list-contract', { headers: this.createHeader() }).map(res => res.json());
  }
  getRoom() {
    return this._http.get(CONFIG.BASE_API + '/rooms/room', { headers: this.createHeader() }).map(res => res.json());
  }
  tokenError() {
    return this._tokenService.tokenError();
  }
  getRecEnable() {
    return this._http.get(CONFIG.BASE_API + '/recs/rec-enable', { headers: this.createHeader() }).map(res => res.json());
  }
  addContract(contract) {
    return this._http.post(CONFIG.BASE_API + '/contracts/contract', contract, { headers: this.createHeader() }).map(res => res.json());
  }
  delContract(contract_id) {
    // tslint:disable-next-line:max-line-length
    return this._http.delete(CONFIG.BASE_API + '/contracts/del-contract?contract_id=' + contract_id, { headers: this.createHeader() }).map(res => res.json());
  }
  updateContract(contract) {
    // tslint:disable-next-line:max-line-length
    return this._http.put(CONFIG.BASE_API + '/contracts/update-contract', contract, { headers: this.createHeader() }).map(res => res.json());
  }
  getRoomText(room) {
    return this._http.post(CONFIG.BASE_API + '/rooms/type-room', room, { headers: this.createHeader() }).map(res => res.json());
  }
}
