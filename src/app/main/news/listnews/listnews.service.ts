import { Injectable } from '@angular/core';
import { TokenService } from '../../../core/token.service';
import { Http, Headers } from '@angular/http';
import { CONFIG } from '../../../core/app.config';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable()
export class ListnewsService {

  constructor(
    private _http: Http,
    private _tokenService: TokenService
  ) { }
  private createHeader() {
    const headers = new Headers();
    headers.append('Content-Type', 'Application/json');
    headers.append('token', this._tokenService.getToken(CONFIG.TOKEN));
    return headers;
  }
  getNews() {
    return this._http.get(CONFIG.BASE_API + '/news/news', { headers: this.createHeader() }).map(res => res.json());
  }
  tokenError() {
    return this._tokenService.tokenError();
  }
  delNews(new_id) {
    return this._http.delete(CONFIG.BASE_API + '/news/del-news?new_id=' + new_id, { headers: this.createHeader() }).map(res => res.json());
  }
  updateNews(news) {
    return this._http.put(CONFIG.BASE_API + '/news/update-news', news, { headers: this.createHeader() }).map(res => res.json());
  }
}
