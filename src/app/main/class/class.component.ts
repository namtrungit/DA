import { Component, OnInit } from '@angular/core';
import { ClassService } from './class.service';
import { Router } from '@angular/router';
declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {
  public p = 1;
  public list_class: Array<any> = [];
  public list_fal: Array<any> = [];
  // class obj create
  public class_id = '';
  public class_name = '';
  public class_id_faculty = '';

  // class obj select
  public sl_class_id = '';
  public sl_class_name = '';
  public sl_class_id_faculty = '';
  constructor(
    private _classService: ClassService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.getClass();
    this.getFal();
  }
  getClass() {
    this._classService.getClass().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._classService.tokenError();
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
  getFal() {
    this._classService.getFaculty().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._classService.tokenError();
      }
      if (res.status === 'success') {
        this.list_fal = res.Faculties;
        console.log(this.list_fal);
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  addClass() {
    if (this.class_name === '') {
      toastr.warning('Bạn chưa nhập lớp', 'Thông báo');
      $('#class-name').focus();
      return;
    }
    if (this.class_id_faculty === '') {
      toastr.warning('Bạn chưa chọn khoa', 'Thông báo');
      $('#class-id-faculty').focus();
      return;
    }
    const cla = JSON.stringify({
      class_name: this.class_name,
      class_id_faculty: this.class_id_faculty
    });
    this._classService.addClass(cla).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._classService.tokenError();
      }
      if (res.status === 'warning') {
        toastr.warning(res.message);
        this.getClass();
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.class_name = '';
        this.class_id_faculty = '';
        this.getClass();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  selectClass(cla) {
    this.sl_class_id = cla.class_id;
    this.sl_class_name = cla.class_name;
    this.sl_class_id_faculty = cla.fal_id;
    // console.log(this.class_id);
  }
  clearClass() {
    this.sl_class_id = '';
    this.sl_class_name = '';
    this.sl_class_id_faculty = '';
    // console.log(this.class_id);
  }
  delClass(class_id) {
    this._classService.delClass(this.sl_class_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._classService.tokenError();
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getClass();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  updateClass() {
    if (this.sl_class_name === '') {
      toastr.warning('Bạn chưa nhập lớp', 'Thông báo');
      $('#sl-class-name').focus();
      return;
    }
    if (this.sl_class_id_faculty === '') {
      toastr.warning('Bạn chưa chọn khoa', 'Thông báo');
      $('#sl-class-id-faculty').focus();
      return;
    }
    const cla = JSON.stringify({
      class_id: this.sl_class_id,
      class_name: this.sl_class_name,
      class_id_faculty: this.sl_class_id_faculty
    });
    this._classService.updateClass(cla).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (!res.isAuth && res.status === 'error') {
        return this._classService.tokenError();
      }
      if (res.status === 'warning') {
        toastr.warning(res.message);
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getClass();
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
