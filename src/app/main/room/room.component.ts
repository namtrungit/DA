import { Component, OnInit } from '@angular/core';
import { RoomService } from './room.service';
import { Router } from '@angular/router';
declare var toastr: any;
declare var $: any;
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  public list_room: Array<any> = [];
  public list_area: Array<any> = [];
  public list_floor: Array<any> = [];
  public list_stu: Array<any> = [];
  // Create Modal
  public room_id = '';
  public room_name = '';
  public room_max = '';
  public room_id_area = '';
  public room_id_floor = '';
  public area_address = '';

  // SearchModal
  public search_room = '';
  public search_area = '';
  public search_empty = '';
  constructor(
    private _roomService: RoomService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getRoom();
    this.getArea();
    this.getFloor();
  }
  selectStuInRoom(room) {
    // this.room_id = room.room_id;
    this.getStu(room.room_id);
    console.log(room);
  }
  getStu(room_id) {
    this._roomService.getStuInRoom(room_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._roomService.tokenError();
      }
      if (res.status === 'success') {
        this.list_stu = res.list;
        console.log(this.list_stu);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  getRoom() {
    this._roomService.getRoom().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._roomService.tokenError();
      }
      if (res.status === 'success') {
        this.list_room = res.Rooms;
        console.log(this.list_room);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  getArea() {
    this._roomService.getArea().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._roomService.tokenError();
      }
      if (res.status === 'success') {
        this.list_area = res.Areas;
        console.log(this.list_area);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  getFloor() {
    this._roomService.getFloor().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._roomService.tokenError();
      }
      if (res.status === 'success') {
        this.list_floor = res.Floors;
        console.log(this.list_floor);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  selectRoom(room) {
    this.room_id = room.room_id;
    this.room_name = room.room_name;
    this.room_max = room.room_max;
    this.room_id_area = room.area_id;
    this.room_id_floor = room.floor_id;
    // console.log(room.room_id);
  }
  clearCreateRoom() {
    this.room_name = '';
    this.room_max = '';
    this.room_id_area = '';
    this.area_address = '';
    this.room_id_floor = '';
  }
  delRoom(room_id) {
    this._roomService.delRoom(this.room_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._roomService.tokenError();
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getRoom();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  addRoom() {
    if (this.room_name === '') {
      toastr.warning('Bạn chưa nhập tên phòng', 'Thông báo');
      $('#room-name').focus();
      return;
    }
    if (this.room_max === '') {
      toastr.warning('Bạn chưa nhập sức chứa của phòng', 'Thông báo');
      $('#room-quantity').focus();
      return;
    }
    if (this.room_id_area === '') {
      toastr.warning('Bạn chưa chọn khu vực của phòng', 'Thông báo');
      $('#room-id-area').focus();
      return;
    }
    if (this.room_id_floor === '') {
      toastr.warning('Bạn chưa chọn dãy của phòng', 'Thông báo');
      $('#room-id-floor').focus();
      return;
    }
    const room = JSON.stringify({
      room_name: this.room_name,
      room_max: this.room_max,
      room_id_area: this.room_id_area,
      room_id_floor: this.room_id_floor
    });
    // console.log(room);
    this._roomService.addRoom(room).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._roomService.tokenError();
      }
      if (res.status === 'warning') {
        toastr.warning(res.message);
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        $('#createModal').modal('toggle');
        this.getRoom();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  updateRoom() {
    if (this.room_name === '') {
      toastr.warning('Bạn chưa nhập tên phòng', 'Thông báo');
      $('#room-id').focus();
      return;
    }
    if (this.room_max === '') {
      toastr.warning('Bạn chưa nhập sức chứa của phòng', 'Thông báo');
      $('#room-quantity').focus();
      return;
    }
    if (this.room_id_area === '') {
      toastr.warning('Bạn chưa chọn khu vực của phòng', 'Thông báo');
      $('#room-id-area').focus();
      return;
    }
    if (this.room_id_floor === '') {
      toastr.warning('Bạn chưa chọn khu vực của phòng', 'Thông báo');
      $('#room-id-floor').focus();
      return;
    }
    const room = JSON.stringify({
      room_id: this.room_id,
      room_name: this.room_name,
      room_max: this.room_max,
      room_id_area: this.room_id_area,
      room_id_floor: this.room_id_floor
    });
    // return console.log(room);
    this._roomService.updateRoom(room).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._roomService.tokenError();
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        $('#updateModal').modal('toggle');
        this.getRoom();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  clearSearch() {
    this.search_area = '';
    this.search_empty = '';
    this.search_room = '';
  }
  searchRoom() {
    const room = JSON.stringify({
      room: this.search_room,
      area: this.search_area,
      empty: this.search_empty
    });
    // console.log(room);
    this._roomService.searchRoom(room).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._roomService.tokenError();
      }
      if (res.status === 'warning') {
        toastr.warning(res.message);
        return;
      }
      if (res.status === 'success') {
        this.list_room = res.list;
        $('#searchModal').modal('toggle');
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
