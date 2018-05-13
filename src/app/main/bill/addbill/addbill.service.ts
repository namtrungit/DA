import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TokenService } from '../../../core/token.service';
import { CONFIG } from '../../../core/app.config';

@Injectable()
export class AddbillService {

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
  getCreate() {
    return this._http.get(CONFIG.BASE_API + '/users/user', { headers: this.createHeader() }).map(res => res.json());
  }
  tokenError() {
    return this._tokenService.tokenError();
  }
  addBill(bill) {
    return this._http.post(CONFIG.BASE_API + '/bills/bill', bill, { headers: this.createHeader() }).map(res => res.json());
  }
  newBill(bill) {
    return this._http.put(CONFIG.BASE_API + '/bills/new-bill', bill, { headers: this.createHeader() }).map(res => res.json());
  }
  getListIdStu() {
    return this._http.get(CONFIG.BASE_API + '/students/list-id', { headers: this.createHeader() }).map(res => res.json());
  }
  getListIdStuAuto(stu) {
    return this._http.post(CONFIG.BASE_API + '/students/text-stu', stu, { headers: this.createHeader() }).map(res => res.json());
  }
  dellBill(bill_id) {
    // tslint:disable-next-line:max-line-length
    return this._http.delete(CONFIG.BASE_API + '/bills/del-bill?bill_id=' + bill_id, { headers: this.createHeader() }).map(res => res.json());
  }
  getService() {
    return this._http.get(CONFIG.BASE_API + '/services/service-enable', { headers: this.createHeader() }).map(res => res.json());
  }
  addBs(bs) {
    return this._http.post(CONFIG.BASE_API + '/bss/bs', bs, { headers: this.createHeader() }).map(res => res.json());
  }
  getBsById(bs) {
    // tslint:disable-next-line:max-line-length
    return this._http.post(CONFIG.BASE_API + '/bss/bsById?', bs, { headers: this.createHeader() }).map(res => res.json());
  }
  delBs(bs_id) {
    return this._http.delete(CONFIG.BASE_API + '/bss/del-bs?bs_id=' + bs_id, { headers: this.createHeader() }).map(res => res.json());
  }
}
