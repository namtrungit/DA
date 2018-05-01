import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SturegisterService } from './sturegister.service';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-sturegister',
  templateUrl: './sturegister.component.html',
  styleUrls: ['./sturegister.component.css']
})
export class SturegisterComponent implements OnInit {
  public register_id_school = '';
  public register_name = '';
  public register_sex = '';
  public register_class = '';
  public register_faculty = '';
  public register_phone = '';
  public register_mail = '';
  constructor(
    private _router: Router,
    private _sturegisterService: SturegisterService
  ) { }

  ngOnInit() {
    $('#register-birthday').datetimepicker({
      format: 'DD/MM/YYYY'
    });
  }
  addRegister() {
    if (this.register_id_school === '') {
      toastr.warning('Bạn chưa nhập mã số sinh viên', 'Thông báo');
      $('#register-id-school').focus();
      return;
    }
    if (this.register_name === '') {
      toastr.warning('Bạn chưa nhập tên', 'Thông báo');
      $('#register-name').focus();
      return;
    }
    if (this.register_sex === '') {
      toastr.warning('Bạn chưa chọn giới tính', 'Thông báo');
      $('#register-sex').focus();
      return;
    }
    if ($('#register-birthday').val() === '') {
      toastr.warning('Bạn chưa chọn ngày sinh', 'Thông báo');
      $('#register-birthday').focus();
      return;
    }
    if (this.register_class === '') {
      toastr.warning('Bạn chưa nhập lớp', 'Thông báo');
      $('#register-class').focus();
      return;
    }
    if (this.register_faculty === '') {
      toastr.warning('Bạn chưa nhập khoa', 'Thông báo');
      $('#register-faculty').focus();
      return;
    }
    if (this.register_phone === '') {
      toastr.warning('Bạn chưa nhập số điện thoại', 'Thông báo');
      $('#register-phone').focus();
      return;
    }
    const email = this.register_mail, atpos = email.indexOf('@'), dotpos = email.lastIndexOf('.');
    if (this.register_mail === '') {
      toastr.warning('Bạn chưa nhập email', 'Thông báo');
      $('#register-mail').focus();
      return;
    }
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
      toastr.warning('Email không hợp lệ', 'Thông báo');
      $('#register-mail').focus();
      return;
    }
    const register = JSON.stringify({
      register_id_school: this.register_id_school,
      register_name: this.register_name,
      register_sex: this.register_sex,
      register_birthday: $('#register-birthday').val(),
      register_class: this.register_class,
      register_faculty: this.register_faculty,
      register_phone: this.register_phone,
      register_mail: this.register_mail,
    });
    // console.log(register);
    this._sturegisterService.addRegister(register).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.clearbox();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  clearbox() {
    this.register_id_school = '';
    this.register_name = '';
    this.register_sex = '';
    $('#register-birthday').val(null);
    this.register_class = '';
    this.register_faculty = '';
    this.register_phone = '';
    this.register_mail = '';
  }
}
