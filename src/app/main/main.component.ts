import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from './main.service';
import { TokenService } from '../core/token.service';
declare var toastr: any;
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public user: Object = {
    user_fullname: ''
  };
  public user_position = '';
  constructor(
    private _mainService: MainService,
    private _router: Router,
    private _tokenService: TokenService
  ) { }

  ngOnInit() {
    this.getProfile();
  }
  getProfile() {
    this._mainService.getProfile().subscribe(res => {
      if (res.status === 'error') {
        if (!res.isAuth) {
          this._mainService.tokenError();
        }
        toastr.error(res.message);
      } else if (res.status === 'success') {
        this.user = res.user;
        this.user_position = res.user.user_positon;
        // console.log(this.user_position);
      }
    }, error => {
      console.log('Không thể truy cập đến server');
      this._router.navigate(['error']);
    });
  }
  logOut() {
    this._mainService.tokenError();
  }
}
