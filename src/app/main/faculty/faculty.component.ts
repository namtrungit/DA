import { Component, OnInit } from '@angular/core';
import { FacultyService } from './faculty.service';
import { Router } from '@angular/router';
import { TokenService } from '../../core/token.service';
declare var toastr: any;
declare var $: any;
@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  public list_fal: Array<any> = [];
  public fal_name = '';
  public fal_id = '';
  constructor(
    private _facultyService: FacultyService,
    private _router: Router,
    private _tokenService: TokenService
  ) { }

  ngOnInit() {
    this.getFal();
  }
  getFal() {
    this._facultyService.getFaculty().subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._facultyService.tokenError();
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
  addFal() {
    if (this.fal_name === '') {
      toastr.warning('Bạn chưa nhập tên khoa', 'Thông báo');
      $('#fal-name').focus();
      return;
    }
    const fal = JSON.stringify({
      fal_name: this.fal_name
    });
    this._facultyService.addFaculty(fal).subscribe(res => {
      if (res.status === 'error') {
        return toastr.error(res.message);
      }
      if (!res.isAuth && res.status === 'error') {
        return this._facultyService.tokenError();
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getFal();
        $('#fal_name').val('');
        this.fal_name = '';
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  delFal(fal_id) {
    this._facultyService.delFaculty(fal_id).subscribe(res => {
      if (res.status === 'error') {
        toastr.error(res.message);
        return;
      }
      if (res.status === 'success') {
        toastr.success(res.message);
        this.getFal();
        return;
      }
    }, error => {
      console.log('Không nết nối được tới máy chủ');
      this._router.navigate(['error']);
      return;
    });
  }
  selectFaculty(fal) {
    this.fal_id = fal.fal_id;
    console.log(fal.fal_id);
  }
}
