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
  public p = 1;
  public list_room: Array<any> = [];
  public list_area: Array<any> = [];
  public list_floor: Array<any> = [];
  public list_stu: Array<any> = [];
  // Update Modal
  public room_id = '';
  public room_name = '';
  public room_max = '';
  public update_room_name = '';
  // public area_address = '';

  // Create Modal
  public cre_room_name = '';
  public cre_room_max = '';
  public cre_room_id_area = '';
  public cre_room_id_floor = '';
  public cre_room_floor = '';
  public cre_room_price = '';

  // SearchModal
  public search_room = '';
  public search_area = '';
  public search_floor = '';

  // Price modal
  public p_room_id_area = '';
  public p_room_floor = '';
  public p_room_price = '';

  // Stu Modal
  public stu_room_name = '';
  constructor(
    private _roomService: RoomService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getRoom();
    this.getArea();
  }
  selectStuInRoom(room) {
    // this.room_id = room.room_id;
    this.stu_room_name = room.room_name;
    // console.log(this.stu_room_name);
    const room_name = JSON.stringify({
      room_name: this.stu_room_name
    });
    this._roomService.getStuInRoom(room_name).subscribe(res => {
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
  selectRoom(room) {
    this.room_id = room.room_id;
    this.room_name = room.room_name;
    this.room_max = room.room_max;
    this.update_room_name = '';
    // console.log(room.room_id);
  }
  clearCreateRoom() {
    this.cre_room_name = '';
    this.cre_room_max = '';
    this.cre_room_id_area = '';
    this.cre_room_floor = '';
    this.cre_room_price = '';
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
    if (this.cre_room_name === '') {
      toastr.warning('Bạn chưa nhập tên phòng', 'Thông báo');
      $('#cre-room-name').focus();
      return;
    }
    if (this.cre_room_max === '') {
      toastr.warning('Bạn chưa nhập sức chứa của phòng', 'Thông báo');
      $('#cre-room-quantity').focus();
      return;
    }
    if (this.cre_room_id_area === '') {
      toastr.warning('Bạn chưa chọn khu vực của phòng', 'Thông báo');
      $('#cre-room-id-area').focus();
      return;
    }
    if (this.cre_room_floor === '') {
      toastr.warning('Bạn chưa nhập tầng của phòng', 'Thông báo');
      $('#cre-room-floor').focus();
      return;
    }
    if (this.cre_room_price === '') {
      toastr.warning('Bạn chưa nhập giá của phòng', 'Thông báo');
      $('#cre-room-price').focus();
      return;
    }
    const room = JSON.stringify({
      room_name: this.cre_room_name,
      room_max: this.cre_room_max,
      room_id_area: this.cre_room_id_area,
      room_floor: this.cre_room_floor,
      room_price: this.cre_room_price
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
    if (this.room_max === '') {
      toastr.warning('Bạn chưa nhập sức chứa của phòng', 'Thông báo');
      $('#room-quantity').focus();
      return;
    }
    const room = JSON.stringify({
      room_id: this.room_id,
      update_room_name: this.update_room_name,
      room_max: this.room_max,
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
      if (res.status === 'warning') {
        toastr.warning(res.message);
        return;
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
    this.search_floor = '';
    this.search_room = '';
  }
  searchRoom() {
    const room = JSON.stringify({
      room_name: this.search_room,
      room_id_area: this.search_area,
      room_floor: this.search_floor
    });
    // console.log(room);
    // return;
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
        this.list_room = res.Rooms;
        $('#searchModal').modal('toggle');
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  updatePrice() {
    if (this.p_room_id_area === '') {
      toastr.warning('Bạn chưa chọn khu', 'Thông báo');
      $('#p-room-id-area').focus();
      return;
    }
    if (this.p_room_floor === '') {
      toastr.warning('Bạn chưa nhập tầng', 'Thông báo');
      $('#p-room-floor').focus();
      return;
    }
    if (this.p_room_price === '') {
      toastr.warning('Bạn chưa nhập tiền phòng', 'Thông báo');
      $('#p-room-price').focus();
      return;
    }
    const price = JSON.stringify({
      room_id_area: this.p_room_id_area,
      room_floor: this.p_room_floor,
      room_price: this.p_room_price
    });
    // console.log(price);
    this._roomService.updatePrice(price).subscribe(res => {
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
        $('#priceModal').modal('toggle');
        this.getRoom();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  clearPrice() {
    this.p_room_id_area = '';
    this.p_room_floor = '';
    this.p_room_price = '';
  }
}
