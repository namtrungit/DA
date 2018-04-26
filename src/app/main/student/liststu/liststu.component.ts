import { Component, OnInit } from '@angular/core';
import { ListstuService } from './liststu.service';
import { Router } from '@angular/router';
import { CONFIG } from '../../../core/app.config';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-liststu',
  templateUrl: './liststu.component.html',
  styleUrls: ['./liststu.component.css']
})
export class ListstuComponent implements OnInit {
  public list_students: Array<any> = [];
  public folder_avatar: string = CONFIG.BASE_API + '/uploads/students/';
  public list_class: Array<any> = [];
  public list_room: Array<any> = [];
  public stu_id = '';
  public stu_avatar = '';
  public stu_id_school = '';
  public stu_name = '';
  public stu_phone = '';
  public stu_email = '';
  public stu_address = '';
  public stu_id_class = '';
  public stu_id_room = 0;
  public stu_birthday = '';
  public stu_sex: string;
  public stu_dad_name = '';
  public stu_dad_phone = '';
  public stu_mom_name = '';
  public stu_mom_phone = '';
  // Modal swap
  public swap_id_room = 0;
  constructor(
    private _router: Router,
    private _listStuService: ListstuService
  ) { }
  ngOnInit() {
    this.getStu();
    $('#stu-birthday').datetimepicker({
      format: 'DD/MM/YYYY'
    });
    this.getClass();
    this.getRoom();
  }
  uploadAvatar(e) {
    const formData = new FormData();
    formData.append('avatar', e.target.files['0']);
    $.ajax({
      url: CONFIG.BASE_API + '/students/upload-avatar',
      type: 'POST',
      data: formData,
      processData: false,  // tell jQuery not to process the data
      contentType: false,  // tell jQuery not to set contentType
      success: (data) => {
        if (data.status === 'success') {
          toastr.success(data.message);
          this.stu_avatar = data.avatar;
          console.log(data);
          return;
        }
        if (data.status === 'error') {
          console.log(data);
        }
      }
    });
  }
  getRoom() {
    this._listStuService.getRoom().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._listStuService.tokenError();
      }
      if (res.status === 'success') {
        this.list_room = res.Rooms;
        console.log(this.list_room);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  getClass() {
    this._listStuService.getClass().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._listStuService.tokenError();
      }
      if (res.status === 'success') {
        this.list_class = res.Classes;
        console.log(this.list_class);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  getStu() {
    this._listStuService.getStu().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._listStuService.tokenError();
      }
      if (res.status === 'success') {
        this.list_students = res.list;
        console.log(this.list_students);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  selectStu(student) {
    this.stu_id = student.stu_id;
    this.stu_id_school = student.stu_id_school;
    this.stu_name = student.stu_name;
    this.stu_id_class = student.stu_id_class;
    this.stu_phone = student.stu_phone;
    this.stu_email = student.stu_email;
    this.stu_address = student.stu_address;
    $('#stu-birthday').val(student.stu_birthday);
    this.stu_sex = student.stu_sex;
    this.stu_id_room = student.stu_id_room;
    this.stu_dad_name = student.stu_dad_name;
    this.stu_dad_phone = student.stu_dad_phone;
    this.stu_mom_name = student.stu_mom_name;
    this.stu_mom_phone = student.stu_mom_phone;
    this.stu_avatar = student.stu_avatar;
    console.log(student);
  }
  delStu(stu_id, room_id) {
    stu_id = this.stu_id;
    room_id = this.stu_id_room;
    console.log(stu_id);
    console.log(room_id);
    // return;
    this._listStuService.delStu(stu_id, room_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._listStuService.tokenError();
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getStu();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  updateStu() {
    // validated
    if (this.stu_id_school === '') {
      toastr.warning('Bạn chưa nhập mã sinh viên', 'Thông báo');
      $('#stu-id-school').focus();
      return;
    }
    if (this.stu_name === '') {
      toastr.warning('Bạn chưa nhập tên sinh viên', 'Thông báo');
      $('#stu-name').focus();
      return;
    }
    if (this.stu_id_class === '') {
      toastr.warning('Bạn chọn lớp cho sinh viên', 'Thông báo');
      $('#stu-id-class').focus();
      return;
    }
    if (this.stu_phone === '') {
      toastr.warning('Bạn chưa nhập số điện thoại sinh viên', 'Thông báo');
      $('#stu-phone').focus();
      return;
    }
    const email = this.stu_email, atpos = email.indexOf('@'), dotpos = email.lastIndexOf('.');
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
      toastr.warning('Email không hợp lệ', 'Thông báo');
      $('#stu-email').focus();
      return;
    }
    if (this.stu_address === '') {
      toastr.warning('Bạn chưa nhập địa chỉ của sinh viên', 'Thông báo');
      $('#stu-address').focus();
      return;
    }
    if ($('#stu-birthday').val() === '') {
      toastr.warning('Bạn chưa nhập ngày sinh của sinh viên', 'Thông báo');
      $('#stu-birthday').focus();
      return;
    }
    if (this.stu_sex === undefined) {
      toastr.warning('Bạn chưa chọn giới tính của sinh viên', 'Thông báo');
      $('#stu-sex').focus();
      return;
    }
    if (this.stu_dad_name === '') {
      toastr.warning('Bạn chưa nhập tên cha của sinh viên', 'Thông báo');
      $('#stu-dad-name').focus();
      return;
    }
    if (this.stu_dad_phone === '') {
      toastr.warning('Bạn chưa nhập số điện thoại cha của sinh viên', 'Thông báo');
      $('#stu-dad-phone').focus();
      return;
    }
    if (this.stu_mom_name === '') {
      toastr.warning('Bạn chưa nhập tên mẹ của sinh viên', 'Thông báo');
      $('#stu-mom-name').focus();
      return;
    }
    if (this.stu_mom_phone === '') {
      toastr.warning('Bạn chưa nhập số điện thoại mẹ của sinh viên', 'Thông báo');
      $('#stu-mom-phone').focus();
      return;
    }
    if (this.stu_avatar === '') {
      toastr.warning('Bạn chưa chọn ảnh cho sinh viên', 'Thông báo');
      $('#stu-avatar').focus();
      return;
    }
    const student = JSON.stringify({
      stu_id: this.stu_id,
      update_id_school: this.stu_id_school,
      stu_name: this.stu_name,
      stu_email: this.stu_email,
      stu_sex: this.stu_sex,
      stu_birthday: $('#stu-birthday').val(),
      stu_address: this.stu_address,
      stu_phone: this.stu_phone,
      stu_dad_name: this.stu_dad_name,
      stu_dad_phone: this.stu_dad_phone,
      stu_mom_name: this.stu_mom_name,
      stu_mom_phone: this.stu_mom_phone,
      stu_id_class: this.stu_id_class,
      stu_avatar: this.stu_avatar,
    });
    // return console.log(student);
    this._listStuService.updateStu(student).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._listStuService.tokenError();
      }
      if (res.status === 'warning') {
        toastr.success('Cập nhật thành công');
        $('#stuModal').modal('toggle');
        this.getStu();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        $('#stuModal').modal('toggle');
        this.getStu();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  pickRoom() {
    // validated
    if (this.stu_id_room === 0) {
      toastr.warning('Bạn chưa chọn phòng', 'Thông báo');
      $('#stu-id-room').focus();
      return;
    }
    const pick = JSON.stringify({
      stu_id: this.stu_id,
      room_id: this.stu_id_room
    });
    // console.log(pick);
    this._listStuService.pickRoom(pick).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._listStuService.tokenError();
      }
      if (res.status === 'warning') {
        toastr.warning(res.message);
        return;
      }
      if (res.status === 'warning sex') {
        toastr.warning('Giới tính của sinh viên không hợp lệ để chọn phòng này', 'Cảnh báo');
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        $('#pickRoomModal').modal('toggle');
        this.getStu();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  swapRoom() {
    if (this.swap_id_room === 0) {
      toastr.warning('Bạn chưa chọn phòng để đổi', 'Thông báo');
      $('#swap-id-room').focus();
      return;
    }
    const swap = JSON.stringify({
      stu_id: this.stu_id,
      old_room_id: this.stu_id_room,
      new_room_id: this.swap_id_room
    });
    console.log(swap);
    this._listStuService.swapRoom(swap).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._listStuService.tokenError();
      }
      if (res.status === 'warning') {
        toastr.warning(res.message);
        return;
      }
      if (res.status === 'warning sex') {
        toastr.warning('Giới tính của sinh viên không hợp lệ để chọn phòng này', 'Cảnh báo');
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        $('#swapRoomModal').modal('toggle');
        this.getStu();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  endRoom() {
    const end = JSON.stringify({
      stu_id: this.stu_id,
      room_id: this.stu_id_room
    });
    // console.log(end);
    this._listStuService.endRoom(end).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._listStuService.tokenError();
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        $('#endRoomModal').modal('toggle');
        this.getStu();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
