import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TokenService } from '../../core/token.service';
import { CONFIG } from '../../core/app.config';

@Injectable()
export class ServiceService {

  constructor(
    private _htpp: Http,
    private _tokenService: TokenService
  ) { }
  private createHeader() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('token', this._tokenService.getToken(CONFIG.TOKEN));
    return headers;
  }
  getService() {
    return this._htpp.get(CONFIG.BASE_API + '/services/service', { headers: this.createHeader() }).map(res => res.json());
  }
  tokenError() {
    return this._tokenService.tokenError();
  }
  addService(service) {
    return this._htpp.post(CONFIG.BASE_API + '/services/service', service, { headers: this.createHeader() }).map(res => res.json());
  }
  updateService(service) {
    return this._htpp.put(CONFIG.BASE_API + '/services/update-service', service, { headers: this.createHeader() }).map(res => res.json());
  }
  delService(service_id) {
    // tslint:disable-next-line:max-line-length
    return this._htpp.delete(CONFIG.BASE_API + '/services/del-service?service_id=' + service_id, { headers: this.createHeader() }).map(res => res.json());
  }
}
