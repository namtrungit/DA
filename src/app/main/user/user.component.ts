import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  // Create modal
  public cre_user_email = '';
  public cre_user_password = '';
  public cre_user_position = '';
  // Del, update modal
  public user_id = '';
  public user_position = '';
  public user_phone = '';
  public user_birthday = '';
  public user_address = '';
  public user_createdAt = '';
  public user_name = '';
  public user_email = '';
  public list_user: Array<any> = [];
  constructor(
    private _router: Router,
    private _userService: UserService
  ) { }

  ngOnInit() {
    this.getUser();
  }
  addUser() {
    if (this.cre_user_email === '') {
      toastr.warning('Bạn chưa nhập email', 'Thông báo');
      $('#cre-user-email').focus();
      return;
    }
    const email = this.cre_user_email, atpos = email.indexOf('@'), dotpos = email.lastIndexOf('.');
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
      toastr.warning('Email không hợp lệ', 'Thông báo');
      $('#cre-user-email').focus();
      return;
    }
    if (this.cre_user_password === '') {
      toastr.warning('Bạn chưa nhập password', 'Thông báo');
      $('#cre-user-password').focus();
      return;
    }
    if (this.cre_user_position === '') {
      toastr.warning('Bạn chưa nhập vị trí', 'Thông báo');
      $('#cre-user-position').focus();
      return;
    }
    const user = JSON.stringify({
      user_email: this.cre_user_email,
      user_password: this.cre_user_password,
      user_position: this.cre_user_position
    });
    // console.log(user);
    this._userService.addUser(user).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._userService.tokenError();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getUser();
        $('#createModal').modal('toggle');
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  clearCreateUser() {
    this.cre_user_email = '';
    this.cre_user_password = '';
    this.cre_user_position = '';
  }
  getUser() {
    this._userService.getUser().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._userService.tokenError();
        return;
      }
      if (res.status === 'success') {
        this.list_user = res.list;
        console.log(this.list_user);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  selectUser(user) {
    this.user_id = user.user_id;
    this.user_position = user.user_positon;
    this.user_phone = user.user_phone;
    this.user_birthday = user.user_birthday;
    this.user_address = user.user_address;
    this.user_createdAt = user.createdAt;
    this.user_name = user.user_name;
    this.user_email = user.user_email;
    // console.log(user);
  }
  delUser() {
    this._userService.delUser(this.user_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._userService.tokenError();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getUser();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  updateUser() {
    if (this.user_position === '') {
      toastr.warning('Bạn chưa nhập vị trí', 'Thông báo');
      $('#user-position').focus();
      return;
    }
    const user = JSON.stringify({
      user_id: this.user_id,
      user_positon: this.user_position
    });
    // console.log(user);
    // return;
    this._userService.updateUser(user).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        this._userService.tokenError();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getUser();
        $('#updateModal').modal('toggle');
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
