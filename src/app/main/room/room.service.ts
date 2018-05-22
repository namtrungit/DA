import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TokenService } from '../../core/token.service';
import { CONFIG } from '../../core/app.config';
import { map } from 'rxjs/operator/map';
@Injectable()
export class RoomService {

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
  getRoom() {
    return this._http.get(CONFIG.BASE_API + '/rooms/room', { headers: this.createHeader() }).map(res => res.json());
  }
  tokenError() {
    return this._tokenService.tokenError();
  }
  delRoom(room_id) {
    // tslint:disable-next-line:max-line-length
    return this._http.delete(CONFIG.BASE_API + '/rooms/del-room?room_id=' + room_id, { headers: this.createHeader() }).map(res => res.json());
  }
  addRoom(room) {
    return this._http.post(CONFIG.BASE_API + '/rooms/room', room, { headers: this.createHeader() }).map(res => res.json());
  }
  getArea() {
    return this._http.get(CONFIG.BASE_API + '/areas/area', { headers: this.createHeader() }).map(res => res.json());
  }
  getFloor() {
    return this._http.get(CONFIG.BASE_API + '/floors/floor', { headers: this.createHeader() }).map(res => res.json());
  }
  updateRoom(room: Object) {
    return this._http.put(CONFIG.BASE_API + '/rooms/update-room', room, { headers: this.createHeader() }).map(res => res.json());
  }
  searchRoom(room) {
    // tslint:disable-next-line:max-line-length
    return this._http.post(CONFIG.BASE_API + '/rooms/find-room', room, { headers: this.createHeader() }).map(res => res.json());
  }
  getStuInRoom(room_id) {
    // tslint:disable-next-line:max-line-length
    return this._http.get(CONFIG.BASE_API + '/students/student-room?room_id=' + room_id, { headers: this.createHeader() }).map(res => res.json());
  }
}
