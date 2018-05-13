import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TokenService } from '../../../core/token.service';
import { CONFIG } from '../../../core/app.config';

@Injectable()
export class ListbillService {

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
  getBill() {
    return this._http.get(CONFIG.BASE_API + '/bills/bill', { headers: this.createHeader() }).map(res => res.json());
  }
  delBill(bill_id) {
    // tslint:disable-next-line:max-line-length
    return this._http.delete(CONFIG.BASE_API + '/bills/del-bill?bill_id=' + bill_id, { headers: this.createHeader() }).map(res => res.json());
  }
  getBs(bs) {
    return this._http.post(CONFIG.BASE_API + '/bss/bsById', bs, { headers: this.createHeader() }).map(res => res.json());
  }
}
