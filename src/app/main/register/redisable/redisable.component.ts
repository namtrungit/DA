import { Component, OnInit } from '@angular/core';
import { RedisableService } from './redisable.service';
import { Router } from '@angular/router';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-redisable',
  templateUrl: './redisable.component.html',
  styleUrls: ['./redisable.component.css']
})
export class RedisableComponent implements OnInit {
  public p = 1;
  public list_register: Array<any> = [];
  public register_id = '';
  public register_id_school = '';
  public register_name = '';
  public register_sex = '';
  public register_birthday = '';
  public register_class = '';
  public register_faculty = '';
  public register_phone = '';
  public register_mail = '';
  public register_createdAt = '';
  public register_content = '';
  constructor(
    private _redisableService: RedisableService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getDisable();
  }
  selectRegister(register) {
    this.register_id = register.register_id;
    this.register_id_school = register.register_id_school;
    this.register_name = register.stu_name;
    this.register_sex = register.stu_sex;
    this.register_birthday = register.stu_birthday;
    this.register_class = register.class_name;
    this.register_faculty = register.fal_name;
    this.register_phone = register.stu_phone;
    this.register_mail = register.stu_email;
    this.register_createdAt = register.createdAt;
    this.register_content =  register.register_content;
    // console.log(this.register_id);
  }
  getDisable() {
    this._redisableService.getDisable().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._redisableService.tokenError();
      }
      if (res.status === 'success') {
        this.list_register = res.list;
        console.log(this.list_register);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  delRegister() {
    this._redisableService.delRegister(this.register_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._redisableService.tokenError();
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getDisable();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
