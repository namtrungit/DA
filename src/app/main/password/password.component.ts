import { Component, OnInit } from '@angular/core';
import { PasswordService } from './password.service';
import { Router } from '@angular/router';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  public user_id = '';
  public old_password = '';
  public new_password1 = '';
  public new_password2 = '';
  constructor(
    private _router: Router,
    private _passwordService: PasswordService
  ) { }

  ngOnInit() {
    this.getProfile();
  }
  getProfile() {
    this._passwordService.getProfile().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._passwordService.tokenError();
        return;
      }
      if (res.status === 'success') {
        this.user_id = res.user.user_id;
        return;
      }
    }, error => {
      console.log('Không kết nối được tới server');
      this._router.navigate(['error']);
    });
  }
  changePassword() {
    if (this.old_password === '') {
      toastr.warning('Thông báo', 'Bạn chưa nhập mật khẩu cũ');
      return;
    }
    if (this.new_password1 === '') {
      toastr.warning('Thông báo', 'Bạn chưa nhập mật khẩu mới');
    }
    if (this.new_password2 === '') {
      toastr.warning('Thông báo', 'Bạn chưa xác nhận mật khẩu mới');
    }
    if (this.new_password1 !== this.new_password2) {
      toastr.warning('Thông báo', 'Mật khẩu mới xác nhận không chính xác');
    }
    const pass: Object = {
      user_id: this.user_id,
      old_password: this.old_password,
      new_password: this.new_password1
    };
    console.log(pass);
    this._passwordService.changePassword(pass).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._passwordService.tokenError();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this._router.navigate(['main']);
        return;
      }
    }, error => {
      console.log('Không kết nối được tới server');
      this._router.navigate(['error']);
    });
  }
}
