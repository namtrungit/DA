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
  public register_content = '';
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
    if (this.register_content === '') {
      toastr.warning('Bạn chưa nhập nội dung', 'Thông báo');
      $('#register-content').focus();
      return;
    }
    const register = JSON.stringify({
      register_id_school: this.register_id_school,
      register_content: this.register_content
    });
    // console.log(register);
    // return;
    this._sturegisterService.addRegister(register).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (res.status === 'warning') {
        toastr.warning(res.message);
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
    this.register_content = '';
  }
}
