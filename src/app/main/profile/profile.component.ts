import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';
declare var toastr: any;
declare var $: any;
declare var moment: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user_id: number;
  public user_name: '';
  public user_email: '';
  public user_birthday: '';
  public user_address: '';
  public user_phone: '';
  public user_sex: '';
  public createdAt: Date;
  constructor(
    private _profileService: ProfileService,
    private _router: Router
  ) {
  }

  ngOnInit() {
    this.getProfile();
    $('#user_birthday').datetimepicker({
      format: 'DD/MM/YYYY'
    });
  }
  getProfile() {
    this._profileService.getProfile().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._profileService.tokenError();
      }
      if (res.status === 'success') {
        const day = moment(res.user.user_birthday).format('DD/MM/YYYY');
        this.user_id = res.user.user_id;
        this.user_name = res.user.user_name;
        this.user_email = res.user.user_email;
        $('#user_birthday').val(day);
        this.user_address = res.user.user_address;
        this.user_phone = res.user.user_phone;
        this.user_sex = res.user.user_sex;
        this.createdAt = res.user.createdAt;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  updateProfile() {
    if (this.user_name === '') {
      toastr.warning('Thông báo', 'Bạn chưa nhập tên');
      $('#user_name').focus();
      return;
    }
    if (this.user_birthday === '') {
      toastr.warning('Thông báo', 'Bạn chưa nhập ngày sinh');
      $('#user_birthday').focus();
      return;
    }
    if ( this.user_address === '') {
      toastr.warning('Thông báo', 'Bạn chưa nhập địa chỉ');
      $('#user_address').focus();
      return;
    }
    if (this.user_phone === '') {
      toastr.warning('Thông báo', 'Bạn chưa nhập địa chỉ');
      $('#user_phone').focus();
      return;
    }
    const data: Object = JSON.stringify({
      user_id: this.user_id,
      user_name: this.user_name,
      user_email: this.user_email,
      user_birthday: $('#user_birthday').val(),
      user_address: this.user_address,
      user_phone: this.user_phone,
      user_sex: this.user_sex,
    });
    console.log(data);
    this._profileService.updateProfile(data).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._profileService.tokenError();
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.user_name = '';
        this.user_email = '';
        this.user_birthday = '';
        this.user_address = '';
        this.user_phone = '';
        this.user_sex = '';
        this._router.navigate(['main']);
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
