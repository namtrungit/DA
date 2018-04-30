import { Injectable } from '@angular/core';
import { CONFIG } from '../../../core/app.config';
import { TokenService } from '../../../core/token.service';
import { Headers, Http } from '@angular/http';
@Injectable()
export class ListstuService {

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
  getStu() {
    return this._http.get(CONFIG.BASE_API + '/students/student', { headers: this.createHeader() }).map(res => res.json());
  }
  tokenError() {
    return this._tokenService.tokenError();
  }
  delStu(stu_id, room_name) {
    // tslint:disable-next-line:max-line-length
    return this._http.delete(CONFIG.BASE_API + '/students/del-student?stu_id=' + stu_id + '&room_name=' + room_name, { headers: this.createHeader() }).map(res => res.json());
  }
  updateStu(stu) {
    return this._http.put(CONFIG.BASE_API + '/students/update-student', stu, { headers: this.createHeader() }).map(res => res.json());
  }
  getClass() {
    return this._http.get(CONFIG.BASE_API + '/classes/class', { headers: this.createHeader() }).map(res => res.json());
  }
  getRoom() {
    return this._http.get(CONFIG.BASE_API + '/rooms/room', { headers: this.createHeader() }).map(res => res.json());
  }
  pickRoom(pick) {
    return this._http.post(CONFIG.BASE_API + '/students/pick-room', pick, { headers: this.createHeader() }).map(res => res.json());
  }
  swapRoom(swap) {
    return this._http.put(CONFIG.BASE_API + '/students/swap-room', swap, { headers: this.createHeader() }).map(res => res.json());
  }
  endRoom(end) {
    return this._http.put(CONFIG.BASE_API + '/students/end-room', end, { headers: this.createHeader() }).map(res => res.json());
  }
  searchStu(search) {
    return this._http.post(CONFIG.BASE_API + '/students/search-stu', search, { headers: this.createHeader() }).map(res => res.json());
  }
  getRoomText(room) {
    return this._http.post(CONFIG.BASE_API + '/rooms/type-room', room, { headers: this.createHeader() }).map(res => res.json());
  }
}
