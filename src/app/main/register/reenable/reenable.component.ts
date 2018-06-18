import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReenableService } from './reenable.service';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-reenable',
  templateUrl: './reenable.component.html',
  styleUrls: ['./reenable.component.css']
})
export class ReenableComponent implements OnInit {
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
    private _router: Router,
    private _reenableService: ReenableService
  ) { }

  ngOnInit() {
    this.getEnable();
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
  getEnable() {
    this._reenableService.getEnable().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._reenableService.tokenError();
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
    this._reenableService.delRegister(this.register_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._reenableService.tokenError();
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getEnable();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  checkRegister(register) {
    const re = JSON.stringify({
      register_id: register.register_id
    });
    // console.log(re);
    // return;
    this._reenableService.checkRegister(re).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._reenableService.tokenError();
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getEnable();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
}
