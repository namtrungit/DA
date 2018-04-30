import { Component, OnInit } from '@angular/core';
import { CONFIG } from '../../../core/app.config';
import { AddstuService } from './addstu.service';
import { Router } from '@angular/router';
declare var toastr: any;
declare var $: any;
@Component({
  selector: 'app-addstu',
  templateUrl: './addstu.component.html',
  styleUrls: ['./addstu.component.css']
})
export class AddstuComponent implements OnInit {
  public folder_avatar: string = CONFIG.BASE_API + '/uploads/students/';
  public list_class: Array<any> = [];
  public stu_avatar = '';
  public stu_id_school = '';
  public stu_name = '';
  public stu_phone = '';
  public stu_email = '';
  public stu_address = '';
  public stu_id_class = '';
  public stu_birthday = '';
  public stu_sex: string;
  public stu_dad_name = '';
  public stu_dad_phone = '';
  public stu_mom_name = '';
  public stu_mom_phone = '';
  constructor(
    private _addStuService: AddstuService,
    private _router: Router
  ) { }

  ngOnInit() {
    $('#stu-birthday').datetimepicker({
      format: 'DD/MM/YYYY'
    });
    this.getClass();
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
  getClass() {
    this._addStuService.getClass().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._addStuService.tokenError();
      }
      if (res.status === 'success') {
        this.list_class = res.Classes;
        console.log(this.list_class);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  addStu() {
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
      stu_id_school: this.stu_id_school,
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
    // console.log(student);
    this._addStuService.addStu(student).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._addStuService.tokenError();
        return;
      }
      if (res.status === 'warning') {
        toastr.warning(res.message);
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.stu_id_school = '';
        this.stu_name = '';
        this.stu_email = '';
        this.stu_sex = undefined,
          $('#stu-birthday').val('');
        this.stu_address = '';
        this.stu_phone = '';
        this.stu_dad_name = '';
        this.stu_dad_phone = '';
        this.stu_mom_name = '';
        this.stu_mom_phone = '';
        this.stu_id_class = '';
        this.stu_avatar = '';
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
