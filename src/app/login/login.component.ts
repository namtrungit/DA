import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { TokenService } from '../core/token.service';
import { CONFIG } from '../core/app.config';
import { Router } from '@angular/router';
declare var toastr: any;
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email = '';
  public password = '';
  constructor(
    private _loginService: LoginService,
    private _tokenService: TokenService,
    private _router: Router
  ) { }

  ngOnInit() {
  }
  login() {
    if (this.email === '') {
      toastr.warning('Bạn chưa nhập email', 'Thông báo');
      $('#email').focus();
      return;
    }
    const email = this.email, atpos = email.indexOf('@'), dotpos = email.lastIndexOf('.');
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
      toastr.warning('Email không hợp lệ', 'Thông báo');
      return;
    }
    if (this.password === '') {
      toastr.warning('Bạn chưa nhập mật khẩu', 'Thông báo');
      $('#password').focus();
      return;
    }
    this._loginService.login(this.email, this.password).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      } else if (res.status === 'success') {
        this._tokenService.setToken(CONFIG.TOKEN, res.token);
        toastr.success(res.message);
        this._router.navigate(['main']);
      }
    }, err => {
      console.log('Khong the ket noi den server');
      this._router.navigate(['error']);
    });
  }
}
